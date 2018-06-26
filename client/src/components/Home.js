import React, { Component } from 'react'
import { Link } from 'react-router-dom'


export default class componentName extends Component {
  render() {
    return (
      <div>
        <Link to='/'>Home</Link>
        <Link to='/TickTackToe'>TickTackToe Game!^.^</Link>
        <Link to='/CardMatch'>Card match game!^.^</Link>
        <Link to='/ColorGuess'>Guess that RGB color!^.^</Link>
      </div>
    )
  }
}

