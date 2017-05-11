import {
  COUNTER_INCREMENT
} from '../constants'

const counterReducer = (state = 0, action) => {
  if (action.type !== COUNTER_INCREMENT) {
    return state
  }
  return state + 1
}

export default counterReducer

// selectors
export const getValue = (state) => state
