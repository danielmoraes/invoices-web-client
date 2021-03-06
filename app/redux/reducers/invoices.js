import { combineReducers } from 'redux'
import {
  LOADING_INVOICES,
  LOADING_INVOICES_SUCCEEDED,
  LOADING_INVOICES_FAILED,
  CREATING_INVOICE_SUCCEEDED,
  UPDATING_INVOICE_SUCCEEDED,
  DELETING_INVOICE_SUCCEEDED,
  CREATING_INVOICE_ITEM_SUCCEEDED,
  UPDATING_INVOICE_ITEM_SUCCEEDED,
  DELETING_INVOICE_ITEM_SUCCEEDED,
  SIGNING_IN_SUCCEEDED
} from 'redux/actionTypes'

const byId = (state = {}, action) => {
  switch (action.type) {
    case LOADING_INVOICES_SUCCEEDED:
    case CREATING_INVOICE_SUCCEEDED:
    case UPDATING_INVOICE_SUCCEEDED:
      return {
        ...state,
        ...action.payload.entities.invoices
      }

    case DELETING_INVOICE_SUCCEEDED:
      let { [String(action.id)]: deleted, ...rest } = state
      return rest

    case CREATING_INVOICE_ITEM_SUCCEEDED:
    case UPDATING_INVOICE_ITEM_SUCCEEDED:
    case DELETING_INVOICE_ITEM_SUCCEEDED:
      const invoiceId = String(action.invoiceId)
      const invoice = state[invoiceId]
      const updatedInvoice = { ...invoice, amount: action.invoiceAmount }
      return { ...state, [invoiceId]: updatedInvoice }

    case SIGNING_IN_SUCCEEDED:
      return {}

    default: {
      return state
    }
  }
}

const isFetching = (state = false, action) => {
  switch (action.type) {
    case LOADING_INVOICES:
      return true
    case LOADING_INVOICES_SUCCEEDED:
    case LOADING_INVOICES_FAILED:
      return false
    default:
      return state
  }
}

const invoicesReducer = combineReducers({
  byId, isFetching
})

export default invoicesReducer

// selectors

export const getIsFetching = (state) => state.isFetching

export const getInvoice = (state, id) => state.byId[id] || {}

export const getInvoices = (state) => {
  let ids = Object.keys(state.byId)
  // sort the ids in desceding order
  ids.sort((a, b) => Number.parseInt(b) - Number.parseInt(a))
  return ids.map(id => getInvoice(state, id))
}
