import { Auth } from '../api'

export const appLoad = () => ({
  type: 'APP_LOAD'
})

export const incrementCounter = () => ({
  type: 'INCREMENT_COUNTER'
})

export const authenticate = () => (dispatch) => {
  dispatch({ type: 'FETCH_START' })
  return Auth.current().then(response => {
    if (response.status === 200) {
      dispatch({ type: 'AUTH_SUCCESS', user: response.json() })
    } else {
      dispatch({ type: 'AUTH_FAILED' })
    }
    dispatch({ type: 'FETCH_END' })
  })
}

export const login = (email, password, keepAlive = false) => (dispatch) => {
  dispatch({ type: 'FETCH_START' })
  return Auth.login(email, password, keepAlive).then(response => {
    if (response.status === 200) {
      dispatch({ type: 'AUTH_SUCCESS', user: response.json() })
    } else {
      dispatch({ type: 'AUTH_FAILED' })
      dispatch({ type: 'LOGIN_FAILED' })
    }
    dispatch({ type: 'FETCH_END' })
  })
}

export const logout = () => (dispatch) => {
  dispatch({ type: 'FETCH_START' })
  return Auth.logout().then(response => {
    if (response.status === 200) {
      dispatch({ type: 'LOGOUT_SUCCESS' })
    }
    dispatch({ type: 'FETCH_END' })
  })
}
