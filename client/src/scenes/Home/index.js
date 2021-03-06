import React, { Component } from 'react'

import GamesList from './components/GamesList'

import './index.css'

class Home extends Component {
    render() {
        return (
            <div className="home">
                {/* Featured item */}
                <GamesList games={this.props.games}/>
            </div>
        )
    }
}

export default Home