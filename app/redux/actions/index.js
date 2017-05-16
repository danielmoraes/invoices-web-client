import { Auth } from 'api'
import * as actionTypes from '../actionTypes'

// action creators

export const signInCancel = () => ({
  type: actionTypes.SIGN_IN_CANCEL
})

// async action creators

export const loadAuthUser = () => (dispatch) => {
  dispatch({ type: actionTypes.LOADING_AUTH_USER })
  return Auth.current().then(response => {
    if (response.status === 200) {
      const user = response.json()
      dispatch({ type: actionTypes.LOADING_AUTH_USER_SUCCEEDED, payload: user })
    } else {
      dispatch({ type: actionTypes.LOADING_AUTH_USER_FAILED })
    }
  })
}

export const signIn = (email, password) => (dispatch) => {
  dispatch({ type: actionTypes.SIGNING_IN })
  return Auth.signIn(email, password).then(response => {
    if (response.status === 200) {
      const user = response.json()
      dispatch({ type: actionTypes.SIGNING_IN_SUCCEEDED, payload: user })
    } else {
      dispatch({ type: actionTypes.SIGNING_IN_FAILED })
    }
  })
}

export const signOut = () => (dispatch) => {
  dispatch({ type: actionTypes.SIGNING_OUT })
  return Auth.signOut().then(response => {
    if (response.status === 200) {
      dispatch({ type: actionTypes.SIGNING_OUT_SUCCEEDED })
    } else {
      dispatch({ type: actionTypes.SIGNING_OUT_FAILED })
    }
  })
}
