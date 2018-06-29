const games = [
    { name: 'Tic Tac Toe', url: 'ticTacToe' },
    { name: 'Memory Game', url: 'cardMatch' },
    { name: 'Rock Paper Scissors', url: 'RPS' },
    { name: 'Color Guess', url: 'colorGuess' },
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