import React, { Component } from 'react'

import { connect } from 'react-redux'
import { loadScores } from '../../redux/reducers/gamesReducer'

import Leaderboard from './components/Leaderboard'

import './index.css'

class GameView extends Component {
    componentDidMount() {
        this.props.loadScores(this.props.match.params.id)
    }

    render() {
        const game = this.props.games.find(game => game.url === this.props.match.params.id)
        const { scores } = this.props
        return (
            <div className="game-view utility-wrapper">
                {
                    game && 
                    <h2>{game.name}</h2>
                }
                <Leaderboard scores={scores}/>
            </div>
        )
    }
}

export default connect(state => ({games: state.games.games, scores: state.games.scores}), { loadScores })(GameView)