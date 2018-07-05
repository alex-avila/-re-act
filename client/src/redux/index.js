import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import games from './reducers/gamesReducer'
import auth from './reducers/theAuthorator'

const rootReducer = combineReducers({ games, auth })
//now do magic react

const store = createStore(rootReducer, applyMiddleware(thunk))

store.subscribe(() => console.log(store.getState()))

export default store