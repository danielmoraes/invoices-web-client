import { combineReducers } from 'redux'
import {
  SIGNING_IN_SUCCEEDED,
  LOADING_AUTH_USER_SUCCEEDED,
  SIGNING_OUT,
  SIGNING_OUT_SUCCEEDED,
  SIGNING_OUT_FAILED
} from '../actionTypes'

const userReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGNING_IN_SUCCEEDED:
    case LOADING_AUTH_USER_SUCCEEDED:
      return action.payload
    case SIGNING_OUT_SUCCEEDED:
      return {}
    default:
      return state
  }
}

const isSigningOutReducer = (state = false, action) => {
  switch (action.type) {
    case SIGNING_OUT:
      return true
    case SIGNING_OUT_SUCCEEDED:
    case SIGNING_OUT_FAILED:
      return false
    default:
      return state
  }
}

const authReducer = combineReducers({
  user: userReducer,
  isSigningOut: isSigningOutReducer
})

export default authReducer

// selectors
export const getUser = (state) => state.user
export const getIsAuthenticated = (state) => state.user.name !== undefined
export const getIsSigningOut = (state) => state.isSigningOut
