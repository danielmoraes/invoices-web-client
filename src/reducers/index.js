import { combineReducers } from 'redux'
import appReducer, * as fromApp from './app'
import authReducer, * as fromAuth from './auth'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer
})

export default rootReducer

// app reducer selectors
export const getIsLoaded = (state) => fromApp.getIsLoaded(state.app)
export const getSignInFailed = (state) => fromApp.getSignInFailed(state.app)
export const getShowLoadingIndicator = (state) =>
  fromApp.getShowLoadingIndicator(state.app)

// auth reducer selectors
export const getIsAuthenticated = (state) =>
  fromAuth.getIsAuthenticated(state.auth)
export const getIsSigningOut = (state) => fromAuth.getIsSigningOut(state.auth)
export const getUser = (state) => fromAuth.getUser(state.auth)
