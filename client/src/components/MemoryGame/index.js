import React, { Component } from 'react'

import GameMenu from './components/GameMenu'
import GameGrid from './components/GameGrid'
import WinModal from './components/WinModal'

import arrowIcon from './icons/arrow.svg'
import emptyStarIcon from './icons/empty-star.svg'
import filledStarIcon from './icons/filled-star.svg'
import refreshIcon from './icons/refresh.svg'

import './index.css'

class MemoryGame extends Component {
    render() {
        const icons = { arrowIcon, emptyStarIcon, filledStarIcon, refreshIcon }
        return (
            <div className="memory-game__wrapper">
                <div className="game__wrapper">
                    <GameMenu {...icons} />
                    <GameGrid />
                </div>
                <WinModal />
            </div>
        );
    }
}

export default MemoryGame