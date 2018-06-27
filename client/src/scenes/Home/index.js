import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import './index.css'

class Home extends Component {
    render() {
        return (
            <div className="home">
                <h1>Hoi</h1>
                <div className="home__games-list">
                    <Link to='/TicTacToe'>TickTackToe Game!^.^</Link>
                    <Link to='/cardMatch'>Card match game!^.^</Link>
                    <Link to='/ColorGuess'>Guess that RGB color!^.^</Link>
                </div>
            </div>
        )
    }
}

export default Home