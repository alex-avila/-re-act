import React, { Component } from "react";

import "./index.css";

import RPS from "./RPS";

class RPSLanding extends Component {
  constructor(props) {
    super(props);
    this.elements = ["Fire", "Water", "Earth"];
    this.state = {
      playerOneWins: false,
      playerTwoWins: false,
      playerTwo: "",
      nullSwitch: false
    };
    //bind here
  }

  handleToggle = () => {
    this.setState(prevState => {
      return {
        isToggled: !prevState.isToggled
      };
    });
  };

  handleAtkAni = attack => {
    this.setState({ nullSwitch: !attack });
  };

  render() {
    return (
      <div className="page">
        <div className="gameContainer">
          <div
            className={this.state.nullSwitch ? 'pKnight' : 'pKnight-atk'}
          />
          <div className="inContainer">
            <RPS
              handleAtkAni={this.handleAtkAni}
              url={this.props.match.path.split("/")[1]}
            />
          </div>
          <div className={this.state.nullSwitch ? 'demon' : 'demon-atk'} />
        </div>
        <div className='smileBomb'>
          <p>Fire beats Earth,</p>
          <p>Earth beats Water,</p>
          <p>Water beats Fire</p>
        </div>
      </div>
    );
  }
}

export default RPSLanding;
