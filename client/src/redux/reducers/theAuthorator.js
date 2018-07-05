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
                ...action.user,
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

const authenticate = user => {
    return {
        type: 'AUTHENTICATE',
        user
    }
}

const verify = () => {
    return dispatch => {
        profileAxios.get('/api/players').then(Response => {
            const {user} = Response.data
            dispatch(authenticate(user))
        }).catch(err => {
            dispatch(authErr('verify', err.Response.status))
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

export const signup = userInfo => {
    return dispatch => {
        axios.post('/auth/signup', userInfo).then(Response => {
            console.log(Response.data)
            const {token, user} = Response.data
            localStorage.token = token
            localStorage.user = JSON.stringify(user)
            dispatch(authenticate(user))
        }).catch(err => {
            dispatch(authErr('signup', err.Response.status))
        })
    }
}

export const loginStuff = credentials => {
    return dispatch => {
        axios.post('/auth/login', credentials).then(Response => {
            const {token, user} = Response.data
            localStorage.token = token
            localStorage.user = JSON.stringify(user)
            dispatch(authenticate(user))
        }).catch(err => {
            dispatch(authErr('signup', err.Response.status))
        })
    }
}

export const logout = () => {
    console.log('hohoh')
    //delete token from local storage
    delete localStorage.token
    delete localStorage.user    
    return {type: 'LOGOUT'}
}

export default theAuthorator