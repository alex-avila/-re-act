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
      attackAnimation: "",
      p1hp: 100,
      p2hp: 100,
      crit: 20,
      weak: 0,
      p1win: false,
      p2win: false,
      count: 0
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

  handleGameFunction = () => {
    if (this.state.nullSwitch) {
      this.setState({ count: 0 });
      this.setState({ time: 3 });
      clearInterval(this.state.timer);
      if (!this.state.p1hp || !this.state.p2hp) {
        this.setState(this.initialState);
      }
    }
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
  };

  handlePlayerCompare = x => {
    const { url } = this.props;
    const updateScores = (url, score) => {
      if (!localStorage.player) {
        return;
      }
      this.props.updateScores(url, score);
    };
    //tom thing
    if (this.state.nullSwitch && this.state.count === 0) {
      this.setState({ count: 1 });
      this.setState({ playerOne: x });
      if (
        (x === "Fire" && this.state.playerTwo === "Earth") ||
        (x === "Earth" && this.state.playerTwo === "Water") ||
        (x === "Water" && this.state.playerTwo === "Fire")
      ) {
        console.log("Player One wins! ^.^");
        this.setState(
          prevState => ({ p2hp: prevState.p2hp - prevState.crit }),
          () => {
            this.setState({
              results: `Player one wins! ^.^`,
              newHp: `Player 2 HP: ${this.state.p2hp}`
            });
            if (this.state.p1hp === 0 || this.state.p2hp === 0) {
              console.log("oehowiehgoiwhegoiwhegoih");
              if (this.state.p1hp === 0) {
                // go to redux and backend and update scores
                updateScores(url, 500);
                this.setState({
                  results: "You died"
                });
              } else {
                // go to redux and backend and update scores
                updateScores(url, 1000);
                this.setState({
                  results: `You have defeted the lord Tony \n yay!`
                });
              }
            }
          }
        );
      } else if (x === this.state.playerTwo) {
        console.log(`It's a draw`);
        this.setState({ results: `It's a draw. -.-` });
      } else {
        this.setState(
          prevState => ({ p1hp: prevState.p1hp - prevState.crit }),
          () => {
            this.setState({
              results: `Player two wins! ^.^`,
              newHp: `Player 1 HP: ${this.state.p1hp}`
            });
            if (this.state.p1hp === 0 || this.state.p2hp === 0) {
              if (!this.state.p1hp) {
                // go to redux and backend and update scores
                updateScores(url, 1000);
                this.setState({
                  results: "You died"
                });
              } else {
                // go to redux and backend and update scores
                updateScores(url, 500);
                this.setState({
                  results: `You have defeted the lord Tom mcLordinessFace \n yay!`
                });
              }
            }
          }
        );
      }
    }
    //handle hp
  };

  render() {
    const { playerOne, playerTwo } = this.state;
    const getChoiceClass = player => {
      return player === "Fire" ? "red" : player === "Water" ? "blue" : "green";
    };

    if (this.state.nullSwitch) {
      this.props.handleAtkAni(true);
    } else {
      this.props.handleAtkAni(false)
    }

    return (
      <div>
        {this.state.nullSwitch ? (
          <div>
            <div className="progress-bar">
              <div className="progress" style={{ width: this.state.p1hp }} />
            </div>
            <div className="progress-bar-2">
              <div className="progress-2" style={{ width: this.state.p2hp }} />
            </div>
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
              this.handleGameFunction();
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
            <div className="resultStyles">
              <div className={getChoiceClass(playerOne)}>
                <p>Player One: {this.state.playerOne}</p>
              </div>
              <div className={getChoiceClass(playerTwo)}>
                <p>Player Two: {this.state.playerTwo}</p>
              </div>
                <div className='score-flex'>
                  <p>{this.state.results}</p>
                  <p>{this.state.newHp}</p>
                </div>
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
