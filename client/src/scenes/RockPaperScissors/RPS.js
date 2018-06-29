import React, { Component } from "react";

class RPS extends Component {
  constructor(props) {
    super(props);
    this.elements = ["Fire", "Water", "Earth"];
    this.state = {
      playerOne: '',
      playerTwo: '',
      playerOneWins: false,
      playerTwoWins: false
    };
    //bind here
    // this.handleWinConditions = this.handleWinConditions.bind(this);
    this.handleGameFunction = this.handleGameFunction.bind(this);
    this.handlePlayerCompare = this.handlePlayerCompare.bind(this);
  }

  // handleWinConditions() {
  //   const { playerOne, playerTwo } = this.state;
  //   if (playerOne === playerTwo) {
  //     return "It's a Draw";
  //   }
  //   if (
  //     (playerOne === "Fire" && playerTwo === "Earth") ||
  //     (playerOne === "Earth" && playerTwo === "Water") ||
  //     (playerOne === "Water" && playerTwo === "Fire")
  //   ) {
  //     return "Player One wins! ^.^";
  //   } else {
  //     return "Player Two Wins! ^.^";
  //   }
  // }

  handleGameFunction() {
    const rng12 = Math.floor(Math.random() * 3 + 1);
    console.log(rng12)
    if (rng12 === 1) {
      this.setState({ playerTwo: 'Fire' });
    } else if (rng12 === 2) {
      this.setState({ playerTwo: 'Water' });
    } else if (rng12 === 3) {
      this.setState({ playerTwo: 'Earth' });
    }
  }

  handlePlayerCompare(x){
    console.log(x)
    console.log(this.state.playerTwo)
    if (
      (x === "Fire" && this.state.playerTwo === "Earth") ||
      (x === "Earth" && this.state.playerTwo === "Water") ||
      (x === "Water" && this.state.playerTwo === "Fire")
    ) {
      console.log("Player One wins! ^.^");
    } else {
      console.log("Player Two Wins! ^.^");
    }
  }

  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.handleGameFunction();
          }}>Start Game</button>
        <button onClick={() => this.handlePlayerCompare('Fire')}>Fire</button>
        <button onClick={() => this.handlePlayerCompare('Water')}>Water</button>
        <button onClick={() => this.handlePlayerCompare('Earth')}>Earth</button>
      </div>
    );
  }
}

export default RPS;
