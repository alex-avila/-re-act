import axios from "axios";

const profileAxios = axios.create();
profileAxios.interceptors.request.use(config => {
    const token = localStorage.getItem("token");
    config.headers.Authorization = `Bearer ${token}`;
    return config;
})

export function signup(playerInfo) {
    return dispatch => {
        axios.post("/auth/signup", playerInfo)
            .then(response => {
                const { token, player } = response.data
                localStorage.setItem("token", token)
                localStorage.setItem("player", JSON.stringify(player))
                dispatch(authenticate(player))
            })
            .catch((err) => {
                dispatch(authError("signup", err.response.status));
            })
    }
}

export function login(credentials) {
    return dispatch => {
        axios.post("/auth/login", credentials)
            .then(response => {
                const { token, player } = response.data;
                localStorage.setItem("token", token)
                localStorage.setItem("player", JSON.stringify(player))
                dispatch(authenticate(player))
            })
            .catch((err) => {
                console.error(err);
                dispatch(authError("login", err.response.status));
            })
    }
}

export function authenticate(player) {
    return {
        type: 'AUTHENTICATE',
        player
    }
}

export function logout() {
    localStorage.removeItem("token")
    localStorage.removeItem("player")
    return {
        type: "LOGOUT"
    }
}

function authError(key, errCode) {
    return {
        type: "AUTH_ERROR",
        key,
        errCode
    }
}

export function verify() {
    return dispatch => {
        profileAxios.get("/api/player")
            .then(response => {
                let { player } = response.data;
                dispatch(authenticate(player));
            }).catch(err => {
                dispatch(authError("verify", err.response.status));
            });
    }
}

const initialState = {
    username: '',
    isAdmin: false,
    authErrCode: {
        signup: "",
        login: ""
    },
    isAuthenticated: false
}

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case "AUTHENTICATE":
            return {
                ...state,
                ...action.player,
                isAuthenticated: true
            }
        case 'LOGOUT':
            return initialState
        case "AUTH_ERROR":
            return {
                ...state,
                authErrCode: {
                    ...state.authErrCode,
                    [action.key]: action.errCode
                }
            }
        default:
            return state;
    }
}

// const initialState = {
//     username: "",
//     isAdmin: false,
//     isAuthenticated: false
// }

// export default function reducer(state = initialState, action) {
//     switch (action.type) {
//         case "AUTHENTICATE":
//             return {
//                 ...state,
//                 ...action.user,
//                 isAuthenticated: true
//             }
//         case "LOGOUT":
//             return initialState;
//         default:
//             return state;
//     }
// }

// export function authenticate(user) {
//     return {
//         type: "AUTHENTICATE",
//         user  // pass the user for storage in Redux store
//     }
// }

// export function signup(userInfo) {
//     return dispatch => {
//         axios.post("/auth/signup", userInfo)
//             .then(response => {
//                 const { token, user } = response.data;
//                 localStorage.token = token
//                 localStorage.user = JSON.stringify(user);
//                 dispatch(authenticate(user));
//             })
//             .catch(err => {
//                 console.error(err);
//             })
//     }
// }

// export function login(credentials) {
//     return dispatch => {
//         axios.post("/auth/login", credentials)
//             .then(response => {
//                 const { token, user } = response.data;
//                 localStorage.token = token
//                 localStorage.user = JSON.stringify(user);
//                 dispatch(authenticate(user));
//             })
//             .catch((err) => {
//                 console.error(err);
//             });
//     }
// }

// export function logout() {
//     delete localStorage.token;
//     delete localStorage.user;
//     return {
//         type: "LOGOUT"
//     }
// }