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
        name: 'Concentration',
        url: 'card-match',
        icon: memoryGameIcon
    },
    {
        name: 'RGB Colors',
        url: 'color-guess',
        icon: colorGuessIcon
    },
    {
        name: 'Elements 2000',
        url: 'RPS',
        icon: rpsIcon
    }
]

let gameAxios = axios.create();

gameAxios.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, err => {
    Promise.reject(err)
})

const gameUrl = '/api/games/'

const initialState = {
    games,
    scores: []
}

export const getGames = () => {
    return {
        type: 'GET_GAMES',
        games
    }
}

const setScores = scores => {
    const sortedScores = scores.sort((a, b) => b.score - a.score)
    // the reduce function makes sure that a player is only listed once on the scores list
    // regardless of the them having multiple scores in the list
    const reducedScores = sortedScores.reduce((final, score) => {
        if (final.some(fScore => fScore.player.username === score.player.username)) {
            return final
        } else {
            return [...final, score]
        }
    }, [])
    // Only send top ten scores
    // (one from each player and sorted descendingly)
    const topTenScores = reducedScores.slice(0, 10)
    return {
        type: 'SET_SCORES',
        scores: topTenScores
    }
}

export const loadScores = url => {
    return dispatch => {
        gameAxios.get(gameUrl + url).then(response => {
            dispatch(setScores(response.data.highScores))
        }).catch(err => {
            console.error(err)
        })
    }
}

export const updateScores = (url, score) => {
    const player = JSON.parse(localStorage.player)._id
    return dispatch => {
        gameAxios.put(gameUrl + url, { highScores: { player, score } })
            .then(response => {
                dispatch(loadScores(url));
            })
            .catch(err => {
                console.error(err);
            })
    }
}

const gamesReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_GAMES':
            return {
                ...state,
                games: [...action.games]
            }
        case 'SET_SCORES':
            return {
                ...state,
                scores: [...action.scores]
            }
        default:
            return state
    }
}

export default gamesReducer