import axios from 'axios';

const profileAxios = axios.create()
profileAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
})

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
     switch(action.type){
        case 'AUTHENTICATE':
            return {
                ...state,
                ...action.player,
                isAuthenticated: true,
                authErrCode: initalState.authErrCode,
                loading: false
            }
        case 'LOGOUT':
            console.log('hey')
            return{
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
    console.log(player)
    return {
        type: 'AUTHENTICATE',
        player
    }
}

export const verify = () => {
    return dispatch => {
        profileAxios.get('/api/players').then(Response => {
            const {user : player} = Response.data
            dispatch(authenticate(player))
        }).catch(err => {
            dispatch(authErr('verify', err.Response))
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
        axios.post('/auth/signup', playerInfo).then(Response => {
            console.log(Response.data)
            const {token, player} = Response.data
            localStorage.token = token
            localStorage.player = JSON.stringify(player)
            dispatch(authenticate(player))
        }).catch(err => {
            dispatch(authErr('signup', err.Response.status))
        })
    }
}

export const loginStuff = credentials => {
    return dispatch => {
        axios.post('/auth/login', credentials).then(Response => {
            console.log(Response.data)
            const {token, player} = Response.data
            localStorage.token = token
            localStorage.player = JSON.stringify(player)
            dispatch(authenticate(player))
        }).catch(err => {
            dispatch(authErr('signup', err.Response.status))
        })
    }
}

export const logout = () => {
    console.log('hohoh')
    //delete token from local storage
    delete localStorage.token
    delete localStorage.player    
    return {type: 'LOGOUT'}
}

export default theAuthorator