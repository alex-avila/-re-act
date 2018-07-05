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
      playerTwo: '',
      startButton: 'Classic game!'
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

  newButton = () => {
    this.setState({startButton: 'Start new game'})
  }
  
  render() {
    return (
      <div className='gameContainer'>
        <div className='dragon'></div>
        <div className="inContainer">
          <button
            onClick={() => {this.handleToggle(); this.newButton()}}>{this.state.startButton}</button>
            {
              this.state.isToggled ? <RPS /> : null
            }
            <button>Reset</button>
            <p>Fire beats Earth,</p>
            <p>Earth beats Water,</p>
            <p>Water beats Fire</p>
        </div>
        <div className='knight'></div>
      </div>
    );
  }
}

export default RPSLanding;
