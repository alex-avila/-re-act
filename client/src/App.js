import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";

import MemoryGame from './components/MemoryGame'
import TicTacToe from './components/TicTacToe/Game'

class App extends Component {
  render() {
    return (
      <div className="wrapper">
        {/* <h1>Hoi</h1> */}
        {/* <Switch>
          <Route exact path='/' Component={home} />
          <Route path='/TickTacToe' Component={TickTacToe} />
          <Route path='/CardMatch' Component={MemoryGame} />
          <Route path='/ColorGuess' Component={ColorGuess} />
        </Switch> */}
        {/* <MemoryGame /> */}
        <TicTacToe />
        {/* <Foot /> */}
      </div>
    );
  }
}

export default App