import ticTacToeIcon from '../../icons/tic-tac-toe-icon.svg'
import memoryGameIcon from '../../icons/memory-icon.svg'
import colorGuessIcon from '../../icons/color-icon.svg'

const games = [
    {
        name: 'Tic Tac Toe',
        url: 'ticTacToe',
        icon: ticTacToeIcon
    },
    {
        name: 'Memory Game',
        url: 'cardMatch',
        icon: memoryGameIcon
    },
    {
        name: 'Color Guess',
        url: 'colorGuess',
        icon: colorGuessIcon
    },
    {
        name: 'Rock Paper Scissors',
        url: 'RPS',
        icon: colorGuessIcon
    },
]

export const getGames = () => {
    return {
        type: 'GET_GAMES',
        games
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