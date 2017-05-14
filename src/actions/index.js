import { Auth } from '../api'
import * as constants from '../constants'

// action creators

export const signInCancel = () => ({
  type: constants.SIGN_IN_CANCEL
})

// async action creators

export const loadAuthUser = () => (dispatch) => {
  dispatch({ type: constants.LOADING_AUTH_USER })
  return Auth.current().then(response => {
    if (response.status === 200) {
      const user = response.json()
      dispatch({ type: constants.LOADING_AUTH_USER_SUCCEEDED, payload: user })
    } else {
      dispatch({ type: constants.LOADING_AUTH_USER_FAILED })
    }
  })
}

export const signIn = (email, password) => (dispatch) => {
  dispatch({ type: constants.SIGNING_IN })
  return Auth.signIn(email, password).then(response => {
    if (response.status === 200) {
      const user = response.json()
      dispatch({ type: constants.SIGNING_IN_SUCCEEDED, payload: user })
    } else {
      dispatch({ type: constants.SIGNING_IN_FAILED })
    }
  })
}

export const signOut = () => (dispatch) => {
  dispatch({ type: constants.SIGNING_OUT })
  return Auth.signOut().then(response => {
    if (response.status === 200) {
      dispatch({ type: constants.SIGNING_OUT_SUCCEEDED })
    } else {
      dispatch({ type: constants.SIGNING_OUT_FAILED })
    }
  })
}
