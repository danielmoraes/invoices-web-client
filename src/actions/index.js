import * as api from '../api'

export const appLoad = () => ({
  type: 'APP_LOAD'
})

export const incrementCounter = () => ({
  type: 'INCREMENT_COUNTER'
})

export const authenticate = (email, password, keepAlive) => (dispatch) =>
  api.authenticate(email, password, keepAlive).then(response => {
    if (response.status === 200) {
      dispatch({
        type: 'AUTH_SUCCESS',
        user: response.user
      })
    } else {
      dispatch({
        type: 'AUTH_FAILED'
      })
      if (email && password) {
        dispatch({
          type: 'LOGIN_FAILED'
        })
      }
    }
  })

export const logout = () => (dispatch) =>
  api.invalidateToken().then(response => {
    if (response.status === 200) {
      dispatch({
        type: 'LOGOUT_SUCCESS'
      })
    }
  })
