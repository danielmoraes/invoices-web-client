import { combineReducers } from 'redux'
import counterReducer, * as fromCounter from './counter'
import userReducer, * as fromUser from './user'

const appState = {
  loaded: false,
  loginFailed: false
}

const appReducer = (state = appState, action) => {
  switch (action.type) {
    case 'APP_LOAD':
      return {
        ...state,
        loaded: true
      }
    case 'AUTH_SUCCESS':
      return {
        ...state,
        loginFailed: false
      }
    case 'LOGIN_FAILED':
      return {
        ...state,
        loginFailed: true
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
export const getLoginFailed = (state) => state.app.loginFailed

// counter reducer helpers
export const getCounter = (state) => fromCounter.getCounter(state.counter)

// user reducer helpers
export const getUser = (state) => fromUser.getUser(state.user)
