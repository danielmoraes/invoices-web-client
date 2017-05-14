import {
  LOADING_INVOICES_SUCCEEDED
} from '../constants'

const invoiceItemsReducer = (state = {}, action) => {
  console.log(action.payload)
  switch (action.type) {
    case LOADING_INVOICES_SUCCEEDED:
      return {
        ...state,
        ...action.payload.entities.invoiceItems
      }
    default:
      return state
  }
}

export default invoiceItemsReducer

// selectors

export const getInvoiceItem = (state, id) => state[id] || []

export const getInvoiceItems = (state, invoiceId) => {
  let ids = Object.keys(state)
  ids = ids.filter(id => state[id].invoiceId === Number.parseInt(invoiceId))
  // sort the ids in desceding order
  ids.sort((a, b) => Number.parseInt(b) - Number.parseInt(a))
  return ids.map(id => getInvoiceItem(state, id))
}
