import axios from 'axios';

const profileAxios = axios.create()
profileAxios.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    }, err => {
        return Promise.reject(err)
    }
)

const initalState = {
    userName: '',
    isAdmin: false,
    isAuthenticated: false,
    authErrCode: {
        signup: '',
        login: ''
    },
    loading: true
}

const theAuthorator = (state = initalState, action) => {
    switch (action.type) {
        case 'AUTHENTICATE':
            return {
                ...state,
                ...action.player,
                isAuthenticated: true,
                authErrCode: initalState.authErrCode,
                loading: false
            }
        case 'LOGOUT':
            return {
                ...initalState,
                loading: false
            }
        case 'AUTH_ERROR':
            return {
                ...state,
                authErrCode: {
                    ...state.authErrCode,
                    [action.key]: action.errCode
                },
                loading: false
            }
        default: return state
    }
}

const authenticate = player => {
    return {
        type: 'AUTHENTICATE',
        player
    }
}

export const verify = () => {
    return dispatch => {
        profileAxios.get("/api/players")
            .then(response => {
                const { user } = response.data;
                dispatch(authenticate(user));
            })
            .catch(err => {
                dispatch(authErr("verify", err.response.status));
            })
    }
}

const authErr = (key, errCode) => {
    return {
        type: 'AUTH_ERROR',
        key,
        errCode
    }
}

export const signup = playerInfo => {
    return dispatch => {
        axios.post('/auth/signup', playerInfo).then(response => {
            console.log("response was given")
            const { token, player } = response.data
            localStorage.token = token
            localStorage.player = JSON.stringify(player)
            dispatch(authenticate(player))
        }).catch(err => {
            dispatch(authErr('signup', err.response.status))
        })
    }
}

export const loginStuff = credentials => {
    return dispatch => {
        axios.post('/auth/login', credentials).then(response => {
            console.log("response was given")
            const { token, player } = response.data
            localStorage.token = token
            localStorage.player = JSON.stringify(player)
            dispatch(authenticate(player))
        }).catch(err => {
            dispatch(authErr('login', err.response.status))
        })
    }
}

export const logout = () => {
    //delete token from local storage
    delete localStorage.token
    delete localStorage.player
    return { type: 'LOGOUT' }
}

export default theAuthorator