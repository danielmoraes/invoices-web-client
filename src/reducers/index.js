import { combineReducers } from 'redux'
import appReducer, * as fromApp from './app'
import counterReducer, * as fromCounter from './counter'
import authReducer, * as fromAuth from './auth'

const rootReducer = combineReducers({
  app: appReducer,
  counter: counterReducer,
  auth: authReducer
})

export default rootReducer

// app reducer selectors
export const getIsLoaded = (state) => fromApp.getIsLoaded(state.app)
export const getSignInFailed = (state) => fromApp.getSignInFailed(state.app)
export const getShowLoadingIndicator = (state) =>
  fromApp.getShowLoadingIndicator(state.app)

// counter reducer selectors
export const getCounter = (state) => fromCounter.getValue(state.counter)

// auth reducer selectors
export const getIsAuthenticated = (state) =>
  fromAuth.getIsAuthenticated(state.auth)
export const getIsSigningOut = (state) => fromAuth.getIsSigningOut(state.auth)
export const getUser = (state) => fromAuth.getUser(state.auth)
