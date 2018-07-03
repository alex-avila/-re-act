import React, { Component } from "react";

export default class RPS extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: "",
      playerOne: "",
      playerTwo: "",
      time: 3
    };
  }

  myTimer = () => {
    this.setState(prevState => ({
      time: prevState.time - 1
    }))
  }

  handleTimer = () => {
    console.log(this.state.time);
    let timer = setInterval(() => {
      if (this.state.time === 0) {
        clearInterval(timer)
      } else {
        this.myTimer()
      }
    }, 1000)
  };

  handleGameFunction = () => {
    // setTimeout(() => {
    const rng12 = Math.floor(Math.random() * 3 + 1);
    if (rng12 === 1) {
      this.setState({ playerTwo: "Fire" });
    } else if (rng12 === 2) {
      this.setState({ playerTwo: "Water" });
    } else if (rng12 === 3) {
      this.setState({ playerTwo: "Earth" });
    }

    // }, 3000);
  };

  handlePlayerCompare = x => {
    this.setState({ playerOne: x })
    if (
      (x === "Fire" && this.state.playerTwo === "Earth") ||
      (x === "Earth" && this.state.playerTwo === "Water") ||
      (x === "Water" && this.state.playerTwo === "Fire")
    ) {
      console.log("Player One wins! ^.^");
      this.setState({ results: "Player one wins! ^.^" });
    } else if (x === this.state.playerTwo) {
      console.log(`It's a draw`);
      this.setState({ results: `It's a draw. -.-` });
    } else {
      console.log("Player Two Wins! ^.^");
      this.setState({ results: "Player two wins! ^.^" });
    }
  };

  cardBackgroundSwitch = () => {

  }

  render() {
    const { playerOne, playerTwo } = this.state

    const getChoiceClass = (player) => {
      return player === 'Fire' ? 'red' : player === 'Water' ? 'blue' : 'green'
    }

    return (
      <div>
        <div>
          <div className="timer">{this.state.time}</div>
          <button onClick={() => this.handlePlayerCompare("Fire")}>Fire</button>
          <button onClick={() => this.handlePlayerCompare("Water")}>
            Water
          </button>
          <button onClick={() => this.handlePlayerCompare("Earth")}>
            Earth
          </button>
        </div>
        <button onClick={
          () => {
            this.handleGameFunction()
            this.handleTimer()
          }
        }>
          Start
        </button>
        {
          this.state.time === 0 &&
          <div style={this.state.condition ? { display: 'flex', flexDirection: 'column' } : null}>
            <div>{this.state.results}</div>
            <div className={getChoiceClass(playerOne)}>Player One: {playerOne}</div>
            <div className={getChoiceClass(playerTwo)}>Player Two: {playerTwo}</div>
          </div>
        }
      </div>
    );
  }
}
