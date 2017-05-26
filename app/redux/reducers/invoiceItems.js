import {
  LOADING_INVOICES_SUCCEEDED,
  CREATING_INVOICE_ITEM_SUCCEEDED,
  UPDATING_INVOICE_ITEM_SUCCEEDED,
  DELETING_INVOICE_ITEM_SUCCEEDED,
  SIGNING_IN_SUCCEEDED
} from 'redux/actionTypes'

const invoiceItemsReducer = (state = {}, action) => {
  switch (action.type) {
    case LOADING_INVOICES_SUCCEEDED:
    case UPDATING_INVOICE_ITEM_SUCCEEDED:
    case CREATING_INVOICE_ITEM_SUCCEEDED:
      return {
        ...state,
        ...action.payload.entities.invoiceItems
      }
    case DELETING_INVOICE_ITEM_SUCCEEDED:
      let { [String(action.id)]: deleted, ...rest } = state
      return rest
    case SIGNING_IN_SUCCEEDED:
      return {}
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
