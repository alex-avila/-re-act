import React, { Component } from 'react'

import GameMenu from './components/GameMenu'
import GameGrid from './components/GameGrid'
import WinModal from './components/WinModal'

import arrowIcon from './icons/arrow.svg'
// import emptyStarIcon from './icons/empty-star.svg'
import filledStarIcon from './icons/filled-star.svg'
import refreshIcon from './icons/refresh.svg'

import './index.css'
import './rpg.css'
import './responsive.css'

class MemoryGame extends Component {
    constructor(props) {
        super(props)
        this.state = {
            gridShuffled: [],
            firstCard: null,
            secondCard: null,
            isChecking: false,
            setsMatched: 0,
            win: false,
            moves: 0,
            timer: new Date(0),
            stars: 3,
            interval: null,
            timerText: '',
            moveCounterText: '',
            winModalData: {
                timeResultText: null,
                starResultText: null,
                isModalOn: false
            }
        }
        this.initialState = null
    }

    win = () => {
        clearInterval(this.state.interval)
        const time = this.state.timer
        const defaultText = (
            <React.Fragment>
                <span>{time.getUTCSeconds()}</span>
                <span className="time-unit">s</span>
            </React.Fragment>
        )
        const timeResultText = (
            <React.Fragment>
                {
                    time.getUTCMinutes() ?
                    <React.Fragment>
                        <span>{time.getUTCMinutes()}</span>
                        <span class="time-unit">m</span>
                        <span>{defaultText}</span>
                    </React.Fragment> :
                    <span>{defaultText}</span>
                }
            </React.Fragment>
        )
        const starResultText = <span>{this.state.stars} out of {this.initialState.stars}</span>
        this.setState({
            winModalData: {
                timeResultText,
                starResultText,
                isModalOn: true
            }
        })
    }

    componentDidMount() {
        this.beginGame()
    }

    generateCards = () => {
        const icons = [
            'ra-pills',
            'ra-fox',
            'ra-toast',
            'ra-gamepad-cross',
            'ra-pisces',
            'ra-perspective-dice-one',
            'ra-skull',
            'ra-acid'
        ];
        let html = []
        let iconsArr = [...icons]

        for (let i = 0; i < 16; i++) {
            const randIndex = Math.floor(Math.random() * iconsArr.length)
            const selection = iconsArr.splice(randIndex, 1)
            iconsArr = i === 7 ? [...icons] : iconsArr
            html.push(
                <div
                    key={selection + i}
                    className="card"
                    data-name={selection}
                    onClick={this.handleFlip}
                >
                    <div className="card__side card__back"></div>
                    <div className={`ra ${selection} card__side card__front`}></div>
                </div>
            )
        }

        this.setState(
            { gridShuffled: html },
            () => this.initialState = this.state
        )
    }

    handleFlip = e => {
        const condition = [...e.target.classList].includes(className => className === 'card')
        const card = condition ? e.target : e.target.parentElement

        if (this.state.moves === 0) {
            this.startTimer();
        }

        if (!card.dataset.matched && !this.state.isChecking) {
            if (!this.state.firstCard) {
                this.setState(
                    prevState => ({ moves: prevState.moves + 1 }),
                    () => this.updateMovesAndStars(this.state.moves)
                )
                // this.updateMovesAndStars(this.state.moves)
                card.classList.toggle('flipped')
                this.setState({ firstCard: card })
            } else if (card !== this.state.firstCard) {
                card.classList.toggle('flipped')
                this.setState({ secondCard: card, isChecking: true })
                setTimeout(this.checkMatch, 550)
            }
        }
    }

    checkMatch = () => {
        let { firstCard, secondCard } = this.state
        if (firstCard.dataset.name === secondCard.dataset.name) {
            firstCard.classList.add('bounce')
            secondCard.classList.add('bounce')
            firstCard.dataset.matched = true
            secondCard.dataset.matched = true
            this.setState(prevState => ({ setsMatched: prevState.setsMatched + 1 }))
            if (this.state.setsMatched === 8) {
                this.setState({ win: true })
                this.win()
            }
        } else {
            firstCard.classList.add('wiggle')
            secondCard.classList.add('wiggle')
            // requestAnimationFrame makes the css transition more consistent
            window.requestAnimationFrame(() => {
                setTimeout(() => {
                    firstCard.classList.remove('wiggle')
                    secondCard.classList.remove('wiggle')
                    firstCard.classList.toggle('flipped')
                    secondCard.classList.toggle('flipped')
                }, 500)
            })
        }
        this.setState({
            firstCard: null,
            secondCard: null,
            isChecking: false
        })
    }

    updateMovesAndStars = (moves) => {
        const moveCounterText = moves === 1 ? `${moves} Move` : `${moves} Moves`
        this.setState({ moveCounterText })
        // gameState.stars = moves < 17 ? 3 : moves < 22 ? 2 : 1
        // if (gameState.stars === 3) {
        //     starTwo.classList.add('filled-star');
        //     starTwo.classList.remove('empty-star');
        //     starThree.classList.add('filled-star');
        //     starThree.classList.remove('empty-star');
        // }
        // if (gameState.stars === 2) {
        //     starThree.classList.remove('filled-star');
        //     starThree.classList.add('empty-star');
        // }
        // if (gameState.stars === 1) {
        //     starTwo.classList.remove('filled-star')
        //     starTwo.classList.add('empty-star')
        // }
    }

    startTimer = () => {
        this.setState({
            interval: setInterval(() => {
                this.state.timer.setUTCSeconds(this.state.timer.getUTCSeconds() + 1)
                this.updateTimer(this.state.timer)
            }, 1000)
        })
    }

    updateTimer = time => {
        const defaultText = (
            <React.Fragment>
                <span>{time.getUTCSeconds()}</span>
                <span className="time-unit">s</span>
            </React.Fragment>
        )
        this.setState({
            timerText: (
                <React.Fragment>
                    {
                        time.getUTCMinutes() ?
                            <React.Fragment>
                                <span>{time.getUTCMinutes()}</span>
                                <span className="time-unit">m</span>
                                <span>{defaultText}</span>
                            </React.Fragment> :
                            <span>{defaultText}</span>
                    }
                </React.Fragment>
            )
        })
    }

    beginGame = () => {
        // Create cards
        this.generateCards()

        // Set initial values
        this.updateMovesAndStars(this.state.moves)
        this.updateTimer(this.state.timer)

        // playAgain.addEventListener('click', () => {
        //     hideModal()
        //     reset()
        // })

        // window.addEventListener('click', (e) => {
        //     if (e.target === modal) {
        //         hideModal()
        //     }
        // })
    }

    flipBackCards = () => {
        for (let card of document.getElementsByClassName('card')) {
            if (card.dataset.matched) {
                card.classList.toggle('flipped')
                card.dataset.matched = false
            }
        }
        if (this.state.firstCard) {
            this.state.firstCard.classList.toggle('flipped')
        }
    }

    handleReset = () => {
        this.flipBackCards()

        if (!this.state.win) {
            clearInterval(this.state.interval)
        }

        const initialState = this.initialState
        this.setState(
            { ...initialState },
            () => {
                this.setState(
                    { timer: new Date(0) },
                    () => this.updateTimer(this.state.timer)
                )
                this.updateMovesAndStars(this.state.moves)
                setTimeout(this.generateCards, 500)
            }
        )

    //     this.updateTimer(this.state.timer)
    //     this.updateMovesAndStars(this.state.moves)
    //     setTimeout(this.generateCards, 500)
    }

    hanldleHideModal = e => {
        if (e.target.id === 'modal') {
            this.setState(prevState => ({
                winModalData: {
                    ...prevState.winModalData,
                    isModalOn: false
                }
            }))
        }
    }

    render() {
        // const icons = { arrowIcon, emptyStarIcon, filledStarIcon, refreshIcon }
        const icons = { filledStarIcon, refreshIcon }
        return (
            <div className="memory-game__wrapper">
                <div className="game__wrapper">
                    <GameMenu
                        {...icons}
                        timerText={this.state.timerText}
                        moveCounterText={this.state.moveCounterText}
                        handleReset={this.handleReset}
                    />
                    <GameGrid gridShuffled={this.state.gridShuffled} />
                </div>
                <WinModal
                    handleHideModal={this.hanldleHideModal}
                    {...this.state.winModalData}
                    arrowIcon={arrowIcon}
                    stars={this.state.stars}
                />
            </div>
        );
    }
}

export default MemoryGame