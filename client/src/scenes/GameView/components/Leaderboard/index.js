import React, { Component } from 'react'

import PlayerScore from './components/PlayerScore'

import './index.css'

class Leaderboard extends Component {
    render() {
        const mappedScores = this.props.scores.map((score, i) => {
            // return <li key={score + i}>{score.player.username}: {score.score}</li>
            return <PlayerScore key={score + i} {...score} rank={i} />
        })
        return (
            <div className="leaderboard">
                <h3>Leaderboard</h3>
                <ol>
                    { mappedScores }
                </ol>
            </div>
        )
    }
}

export default Leaderboard