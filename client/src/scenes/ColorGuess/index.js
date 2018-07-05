import React, { Component } from "react";

import { connect } from 'react-redux'
import { updateScores } from '../../redux/reducers/gamesReducer'

import Squares from "./Squares";
import Countdown from "./Countdown";
import FinishedGame from "./FinishedGame";
import "./index.css";

class RGBGuesser extends Component {
    constructor() {
        super();
        this.state = {
            colors: [],
            chosenCorrect: 0,
            isFinished: false,
            timer: 30,
            showCountdown: true
        }
    }

    //starts game when component is mounted
    componentDidMount = () => {
        this.initialGameState();
    }

    //loops though amount of squares
    //pushes 6 random colors to an array inside of loop and returns it
    displayRandom = () => {
        const colorArr = [];
        for (let i = 0; i < 6; i++) {
            colorArr.push(this.chooseRandom());
        }
        return colorArr;
    }

    //adds 6 new random colors to the colors array in state
    initialGameState = () => {
        this.setState({
            colors: this.displayRandom(6)
        })
    }

    //resets count and chooses 6 new colors to display on screen
    restart = () => {
        this.initialGameState();
        this.setState({
            chosenCorrect: 0,
        })
        this.refs.result.innerHTML = "";
    }

    //randomly chooses a rgb color
    chooseRandom = () => {
        let rColor = Math.floor(Math.random() * 256);
        let gColor = Math.floor(Math.random() * 256);
        let bColor = Math.floor(Math.random() * 256);
        return `rgb(${rColor}, ${gColor}, ${bColor})`;
    }

    //chooses a random color from the colors array and returns it
    pickSquare = () => {
        let colorRan = Math.floor(Math.random() * this.state.colors.length);
        return this.state.colors[colorRan];
    }

    timer = () => {
        this.setState(prevState => {
            return {
                isFinished: !prevState.isFinished,
                showCountdown: !prevState.showCountdown
            }
        })
    }

    //restarts game after player finishes a game
    startAgain = () => {
        this.restart();
        this.setState(prevState => {
            return {
                isFinished: !prevState.isFinished,
                showCountdown: !prevState.showCountdown
            }
        })
    }

    render() {
        //compares background color of clicked square with rgb colored displayed
        //adds 1 to the chosenCorrect count
        //adds another six random colors after user chooses correctly
        let correctColor = this.pickSquare();

        const chooseSquare = e => {
            if (e.currentTarget.style.backgroundColor === correctColor) {
                this.initialGameState();
                this.refs.result.innerHTML = "";
                this.setState(prevState => {
                    return {
                        chosenCorrect: prevState.chosenCorrect + 1,
                    }
                })
            } else {
                this.refs.result.innerHTML = "WRONG!";
                e.currentTarget.style.backgroundColor = "#36424E";
            }
        }

        let mappedSquares = this.state.colors.map((color, i) => {
            return <Squares key={i} squaresResult={chooseSquare} colors={color} />
        })

        if (this.state.isFinished) {
            const url = this.props.match.path.split('/')[1]
            const score = this.state.chosenCorrect * 100
            this.props.updateScores(url, score)
        }

        return (
            <div id="colorGuess">
                {/* rendering countdown timer for the game */}
                {this.state.showCountdown ? <div id="countdownTimer"><Countdown timesUp={this.timer} /></div> : null}

                <h1 className="centerText">RGB Color Guesser</h1>
                <h3 className="centerText">{correctColor}</h3>
                <h3 ref="result" className="centerText"></h3>
                <h3 className="centerText">Number Correct: <span>{this.state.chosenCorrect}</span></h3>

                {/* rendering the six colored squares */}
                <div id="colorGrid">
                    {mappedSquares}
                </div>

                {/* pop up window when the game is completed */}
                <FinishedGame
                    finished={this.state.isFinished}
                    score={this.state.chosenCorrect}
                    startAgain={this.startAgain}
                />
            </div>
        )
    }
}

export default connect(null, { updateScores })(RGBGuesser)