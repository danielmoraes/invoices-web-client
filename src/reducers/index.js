import { combineReducers } from 'redux'

const counter = (state = 0, action) => {
  if (action.type !== 'INCREMENT_COUNTER') {
    return state
  }
  return state + 1
}

const invoicesApp = combineReducers({
  counter
})

export default invoicesApp

export const getCounter = (state) => state.counter
