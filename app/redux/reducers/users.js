import { combineReducers } from 'redux'
import {
  LOADING_USERS,
  LOADING_USERS_SUCCEEDED,
  LOADING_USERS_FAILED,
  CREATING_USER_SUCCEEDED,
  UPDATING_USER_SUCCEEDED,
  DELETING_USER_SUCCEEDED
} from 'redux/actionTypes'

const byId = (state = {}, action) => {
  switch (action.type) {
    case LOADING_USERS_SUCCEEDED:
    case CREATING_USER_SUCCEEDED:
    case UPDATING_USER_SUCCEEDED:
      return {
        ...state,
        ...action.payload.entities.users
      }
    case DELETING_USER_SUCCEEDED:
      let { [action.id]: deleted, ...rest } = state
      return rest
    default:
      return state
  }
}

const isFetching = (state = false, action) => {
  switch (action.type) {
    case LOADING_USERS:
      return true
    case LOADING_USERS_SUCCEEDED:
    case LOADING_USERS_FAILED:
      return false
    default:
      return state
  }
}

const usersReducer = combineReducers({
  byId, isFetching
})

export default usersReducer

// selectors

export const getIsFetching = (state) => state.isFetching

export const getUser = (state, id) => state.byId[id] || {}

export const getUsers = (state) => {
  let ids = Object.keys(state.byId)
  // sort the ids in desceding order
  ids.sort((a, b) => Number.parseInt(b) - Number.parseInt(a))
  return ids.map(id => getUser(state, id))
}
