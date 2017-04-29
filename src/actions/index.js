import * as api from '../api'

export const appLoad = () => ({
  type: 'APP_LOAD'
})

export const incrementCounter = () => ({
  type: 'INCREMENT_COUNTER'
})

export const authenticate = (email, password, keepAlive) => (dispatch) => {
  dispatch({ type: 'FETCH_START' })
  return api.authenticate(email, password, keepAlive).then(response => {
    if (response.status === 200) {
      dispatch({ type: 'AUTH_SUCCESS', user: response.user })
    } else {
      dispatch({ type: 'AUTH_FAILED' })
      if (email && password) {
        dispatch({ type: 'LOGIN_FAILED' })
      }
    }
    dispatch({ type: 'FETCH_END' })
  })
}

export const logout = () => (dispatch) => {
  dispatch({ type: 'FETCH_START' })
  api.invalidateToken().then(response => {
    if (response.status === 200) {
      dispatch({ type: 'LOGOUT_SUCCESS' })
    }
    dispatch({ type: 'FETCH_END' })
  })
}
