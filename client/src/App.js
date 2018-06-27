import React, { Component } from 'react';
import { Switch, Route, Link, withRouter } from "react-router-dom";

import Home from './scenes/Home'
import MemoryGame from './scenes/MemoryGame'
import TicTacToe from './scenes/TicTacToe/Game'
import BackButton from './components/BackButton';

class App extends Component {
  render() {
    console.log(this.props)
    return (
      <div className="wrapper">
        {
          this.props.location.pathname !== '/' &&
          <Link to="/">
            <BackButton />
          </Link>
        }
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/TicTacToe' component={TicTacToe} />
          <Route path='/cardMatch' component={MemoryGame} />
          {/* <Route path='/ColorGuess' Component={ColorGuess} /> */}
        </Switch>
      </div>
    );
  }
}

export default withRouter(App)