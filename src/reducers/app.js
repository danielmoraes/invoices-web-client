import { combineReducers } from 'redux'
import {
  LOADING_AUTH_USER,
  LOADING_AUTH_USER_SUCCEEDED,
  LOADING_AUTH_USER_FAILED,
  SIGN_IN_CANCEL,
  SIGNING_IN,
  SIGNING_IN_SUCCEEDED,
  SIGNING_IN_FAILED,
  SIGNING_OUT,
  SIGNING_OUT_SUCCEEDED,
  SIGNING_OUT_FAILED
} from '../constants'

const isLoadedReducer = (state = false, action) => {
  switch (action.type) {
    case LOADING_AUTH_USER:
      return false
    case LOADING_AUTH_USER_SUCCEEDED:
    case LOADING_AUTH_USER_FAILED:
      return true
    default:
      return state
  }
}

const signInFailedReducer = (state = false, action) => {
  switch (action.type) {
    case SIGN_IN_CANCEL:
    case SIGNING_IN:
    case SIGNING_IN_SUCCEEDED:
      return false
    case SIGNING_IN_FAILED:
      return true
    default:
      return state
  }
}

const pendingRequestsReducer = (state = 0, action) => {
  switch (action.type) {
    case SIGNING_IN:
    case SIGNING_OUT:
    case LOADING_AUTH_USER:
      return state + 1
    case SIGNING_IN_SUCCEEDED:
    case SIGNING_IN_FAILED:
    case SIGNING_OUT_SUCCEEDED:
    case SIGNING_OUT_FAILED:
    case LOADING_AUTH_USER_SUCCEEDED:
    case LOADING_AUTH_USER_FAILED:
      return state - 1
    default:
      return state
  }
}

const appReducer = combineReducers({
  isLoaded: isLoadedReducer,
  signInFailed: signInFailedReducer,
  pendingRequests: pendingRequestsReducer
})

export default appReducer

// selectors
export const getIsLoaded = (state) => state.isLoaded
export const getSignInFailed = (state) => state.signInFailed
export const getShowLoadingIndicator = (state) => state.pendingRequests > 0
