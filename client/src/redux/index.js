import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import games from './reducers/gamesReducer'

const rootReducer = combineReducers({ games })

const store = createStore(rootReducer, applyMiddleware(thunk))

export default store