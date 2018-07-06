import React, { Component } from "react";

import { connect } from "react-redux";
import { updateScores } from "../../redux/reducers/gamesReducer";

import "./index.css";

// import Hero from './charComponents/Hero';

class RPS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: "",
      playerOne: "",
      playerTwo: "",
      time: 3,
      timer: null,
      nullSwitch: false,
      attackAnimation: ""
    };
    this.initialState = this.state;
  }

  myTimer = () => {
    this.setState(prevState => ({
      time: prevState.time - 1
    }));
  };

  handleTimer = () => {
    console.log(this.state.time);
    this.setState({
      timer: setInterval(() => {
        if (this.state.time === 0) {
          clearInterval(this.state.timer);
        } else {
          this.myTimer();
        }
      }, 1000)
    });
  };

  handleGameFunction = bye => {
    if (bye === "bye") {
      this.setState(this.initialState);
      clearInterval(this.state.timer);
    } else {
      const rng12 = Math.floor(Math.random() * 3 + 1);
      if (rng12 === 1) {
        this.setState({ playerTwo: "Fire" });
      } else if (rng12 === 2) {
        this.setState({ playerTwo: "Water" });
      } else if (rng12 === 3) {
        this.setState({ playerTwo: "Earth" });
      }

      this.setState(prevState => {
        return {
          nullSwitch: !prevState.nullSwitch
        };
      });
    }
  };

  handlePlayerCompare = x => {
    const { url } = this.props;
    const updateScores = (url, score) => {
      if (!localStorage.player) {
        return;
      }
      this.props.updateScores(url, score);
    };
    this.setState({ playerOne: x });
    if (
      (x === "Fire" && this.state.playerTwo === "Earth") ||
      (x === "Earth" && this.state.playerTwo === "Water") ||
      (x === "Water" && this.state.playerTwo === "Fire")
    ) {
      // go to redux and backend and update scores
      updateScores(url, 1000);
      console.log("Player One wins! ^.^");
      this.setState({ results: "Player one wins! ^.^" });
    } else if (x === this.state.playerTwo) {
      // go to redux and backend and update scores
      updateScores(url, 250);
      console.log(`It's a draw`);
      this.setState({ results: `It's a draw. -.-` });
    } else {
      // go to redux and backend and update scores
      updateScores(url, 500);
      console.log("Player Two Wins! ^.^");
      this.setState({ results: "Player two wins! ^.^" });
    }
  };

  render() {
    const { playerOne, playerTwo } = this.state;
    const getChoiceClass = player => {
      return player === "Fire" ? "red" : player === "Water" ? "blue" : "green";
    };

      if(this.state.nullSwitch) {
        this.props.handleAtkAni(true)
      } else {
        this.props.handleAtkAni(false)
      }

    return (
      <div>
        {this.state.nullSwitch ? (
          <div>
            <div className="timer">{this.state.time}</div>
            <div className="compare-buttons">
              <button onClick={() => this.handlePlayerCompare("Fire")}>
                <p>Fire</p>
              </button>
              <button onClick={() => this.handlePlayerCompare("Water")}>
                <p>Water</p>
              </button>
              <button onClick={() => this.handlePlayerCompare("Earth")}>
                <p>Earth</p>
              </button>
            </div>
          </div>
        ) : null}
        <button
          onClick={() => {
            if (!this.state.nullSwitch) {
              this.handleGameFunction();
              this.handleTimer();
            } else {
              this.handleGameFunction("bye");
            }
          }}
        >
          {this.state.nullSwitch ? "Reset" : "Start"}
        </button>
        {this.state.time === 0 && (
          <div
            style={
              this.state.condition
                ? { display: "flex", flexDirection: "column" }
                : null
            }
          >
            <div className='resultStyles'>
             <div className={getChoiceClass(playerOne)}>
                Player One: {this.state.playerOne}
              </div>
              <div className={getChoiceClass(playerTwo)}>
                Player Two: {this.state.playerTwo}
              </div>
              <div>{this.state.results}</div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  null,
  { updateScores }
)(RPS);
