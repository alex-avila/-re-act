import React, { Component } from 'react'

import { connect } from 'react-redux'
import { loadScores } from '../../redux/reducers/gamesReducer'

import './index.css'

class GameView extends Component {
    componentDidMount() {
        this.props.loadScores(this.props.match.params.id)
    }

    render() {
        const game = this.props.games.find(game => game.url === this.props.match.params.id)
        const { scores } = this.props
        const mappedScores = scores.map((score, i) => {
            return <li key={score + i}>{score.player.username}: {score.score}</li>
        })
        return (
            <div className="game-view utility-wrapper">
                {/* {
                    game && 
                    <h1>{game.name}</h1>
                } */}
                <div>
                    {/* Image */}
                </div>
                <div>
                    {/* Link to play */}
                </div>
                <div>
                    {/* Description/Article */}
                </div>
                <ol>
                    {mappedScores}
                </ol>
            </div>
        )
    }
}

export default connect(state => ({games: state.games.games, scores: state.games.scores}), { loadScores })(GameView)