import React, { Component } from 'react'

import GameItem from './components/GameItem'

class GamesList extends Component {
    render() {
        const { games } = this.props
        const mappedGameLinks = games.map((gameData, i) => {
            return <GameItem key={gameData.url + i} {...gameData} />
        })
        return (
            <div className="home__games-list">
                {mappedGameLinks}
            </div>
        )
    }
}

export default GamesList