import { combineReducers } from 'redux'
import counterReducer, * as fromCounter from './counter'
import userReducer, * as fromUser from './user'

const appState = {
  loaded: false,
  signInFailed: false,
  pendingRequests: 0
}

const appReducer = (state = appState, action) => {
  switch (action.type) {
    case 'APP_LOAD':
      return {
        ...state,
        loaded: true
      }
    case 'FETCH_START':
      return {
        ...state,
        pendingRequests: state.pendingRequests + 1
      }
    case 'FETCH_END':
      return {
        ...state,
        pendingRequests: state.pendingRequests - 1
      }
    case 'AUTH_SUCCESS':
      return {
        ...state,
        signInFailed: false
      }
    case 'SIGNIN_FAILED':
      return {
        ...state,
        signInFailed: true
      }
    default:
      return state
  }
}

const invoicesReducer = combineReducers({
  app: appReducer,
  counter: counterReducer,
  user: userReducer
})

export default invoicesReducer

// app reducer helpers
export const isAppLoaded = (state) => state.app.loaded
export const getSignInFailed = (state) => state.app.signInFailed
export const isAppFetching = (state) => state.app.pendingRequests > 0

// counter reducer helpers
export const getCounter = (state) => fromCounter.getCounter(state.counter)

// user reducer helpers
export const getUser = (state) => fromUser.getUser(state.user)
