import React, { Component } from 'react';
import { Switch, Route } from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <h1>Hoi</h1>
        <Switch>
          <Route exact path='/' Component={home} />
          <Route path='/TickTacToe' Component={TickTacToe} />
          <Route path='/CardMatch' Component={CardMatch} />
          <Route path='/ColorGuess' Component={ColorGuess} />
        </Switch>
        <Foot />
      </div>
    );
  }
}

export default App;
