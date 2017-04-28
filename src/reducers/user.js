const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'AUTH_SUCCESS':
      return action.user
    case 'AUTH_FAILED':
    case 'LOGOUT_SUCCESS':
      return {}
    default:
      return state
  }
}

export default userReducer

export const getUser = (state) => state
