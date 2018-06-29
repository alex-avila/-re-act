import React, { Component } from 'react'

import { connect } from 'react-redux'

import './index.css'

class GameView extends Component {
    render() {
        const game = this.props.games.find(game => game.url === this.props.match.params.id)
        return (
            <div className="game-view utility-wrapper">
                {
                    game && 
                    <h1>{game.name}</h1>
                }
                <div>
                    {/* Image */}
                </div>
                <div>
                    {/* Link to play */}
                </div>
                <div>
                    {/* Description/Article */}
                </div>
            </div>
        )
    }
}

export default connect(state => ({games: state.games}), {})(GameView)