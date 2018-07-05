import axios from 'axios'

import ticTacToeIcon from '../../icons/tic-tac-toe-icon.svg'
import memoryGameIcon from '../../icons/memory-icon.svg'
import colorGuessIcon from '../../icons/color-icon.svg'
import rpsIcon from '../../icons/rps-icon.svg'

const games = [
    {
        name: 'Tic Tac Toe',
        url: 'tic-tac-toe',
        icon: ticTacToeIcon
    },
    {
        name: 'Memory Game',
        url: 'card-match',
        icon: memoryGameIcon
    },
    {
        name: 'Color Guess',
        url: 'color-guess',
        icon: colorGuessIcon
    },
    {
        name: 'Rock Paper Scissors',
        url: 'RPS',
        icon: rpsIcon
    },
]

export const getGames = () => {
    return {
        type: 'GET_GAMES',
        games
    }
}

export const updateScores = url => {
    return dispatch => {
        axios.put('/api/games/' + url, { highScores: { user: '5b3d8eee801e5eac9cca15a1', score: 3434 } }).then(response => {
            console.log(response.data)
        }).catch(err => {
            console.log(err)
        })
    }
}

const gamesReducer = (state = [], action) => {
    switch (action.type) {
        case 'GET_GAMES':
            return [...state, ...games]
        default:
            return state
    }
}

export default gamesReducer