import React, { Component } from "react";

import './index.css';

import RPS from './RPS'

class RPSLanding extends Component {
  constructor(props) {
    super(props);
    this.elements = ["Fire", "Water", "Earth"];
    this.state = {
      playerOneWins: false,
      playerTwoWins: false,
      playerTwo: ''
    };
    //bind here
  }

  handleToggle = () => {
    this.setState(prevState => {
      return {
          isToggled: !prevState.isToggled
      }
    })
  }

  render() {
    return (
      <div className="gameContainer">
        <button
          onClick={() => {
            this.handleToggle();
          }}>Classic game!</button>
          { 
            this.state.isToggled ? <RPS /> : null
          }
          <button>Reset</button>
          <p>Fire beats Earth,</p>
          <p>Earth beats Water,</p>
          <p>Water beats Fire</p>
      </div>
    );
  }
}

export default RPSLanding;
