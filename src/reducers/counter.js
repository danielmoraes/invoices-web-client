const counterReducer = (state = 0, action) => {
  if (action.type !== 'INCREMENT_COUNTER') {
    return state
  }
  return state + 1
}

export default counterReducer

export const getCounter = (state) => state
