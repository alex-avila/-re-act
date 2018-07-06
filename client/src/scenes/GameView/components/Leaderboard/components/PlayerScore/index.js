import React, { Component } from 'react'

import './index.css'

class PlayerScore extends Component {
    render() {
        const { player: { username, gravatar }, score, rank } = this.props
        return (
            <li className="player-score">
                <div className="player-score__player">
                    {
                        rank !== 1 &&
                        <span className="player-score__rank">{rank}</span>
                    }
                    <img className="player-score__img" src={gravatar} alt="" />
                    <span className="player-score__username">{username}</span>
                </div>
                <span className="player-score__score">{score}</span>
            </li>
        )
    }
}

export default PlayerScore