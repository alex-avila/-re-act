import React, {Component} from "react";
import Squares from "./Squares";
import Countdown from "./Countdown";
import FinishedGame from "./FinishedGame";
import Sound from "react-sound";
import Correct from "./Sounds/correct.mp3";
import Finished from "./Sounds/finished.wav";
import "./index.css";

class RGBGuesser extends Component {
    constructor(){
        super();
        this.state = {
            colors: [], 
            chosenCorrect: 0,
            isFinished: false,
            showCountdown: true,
            isCorrect: false
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
        for(let i = 0; i < 6; i++){
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

    render(){
        //compares background color of clicked square with rgb colored displayed
        //adds 1 to the chosenCorrect count
        //adds another six random colors after user chooses correctly
        let correctColor = this.pickSquare();
        
        const chooseSquare = e => {
                if(e.currentTarget.style.backgroundColor === correctColor){
                    this.initialGameState();
                    this.setState(prevState => {
                        return {
                            chosenCorrect: prevState.chosenCorrect + 1,
                            isCorrect: true
                        }
                    })
                }else{
                    e.currentTarget.style.backgroundColor = "#36424E";
                }
            }

            let mappedSquares = this.state.colors.map((color, i) => {
                return <Squares key={i} squaresResult={chooseSquare} colors={color}/>
            })

        return(
            <div id="colorGuess">
                {/* sound effects for correct guess and finished game */}
                {this.state.isCorrect ? <Sound url={Correct} playStatus={Sound.status.PLAYING} volume={70}/> : null}
                {this.state.isFinished ? <Sound url={Finished} playStatus={Sound.status.PLAYING} volume={70}/> : null}

                {/* rendering countdown timer for the game */}
                {this.state.showCountdown ? <div id="countdownTimer"><Countdown timesUp={this.timer}/></div> : null}

                <h1 className="centerText">RGB Color Guesser</h1>
                <h3 className="centerText">{correctColor}</h3>
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

export default RGBGuesser;