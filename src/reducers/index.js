import { combineReducers } from 'redux'
import appReducer, * as fromApp from './app'
import authReducer, * as fromAuth from './auth'
import invoicesReducer, * as fromInvoices from './invoices'
import invoiceItemsReducer, * as fromInvoiceItems from './invoiceItems'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  invoices: invoicesReducer,
  invoiceItems: invoiceItemsReducer
})

export default rootReducer

// app reducer selectors

export const getIsLoaded = (state) => fromApp.getIsLoaded(state.app)

export const getSignInFailed = (state) => fromApp.getSignInFailed(state.app)

export const getShowLoadingIndicator = (state) =>
  fromApp.getShowLoadingIndicator(state.app)

// auth reducer selectors

export const getIsAuthenticated = (state) =>
  fromAuth.getIsAuthenticated(state.auth)

export const getIsSigningOut = (state) => fromAuth.getIsSigningOut(state.auth)

export const getUser = (state) => fromAuth.getUser(state.auth)

// invoices reducer selectors

export const getIsFetchingInvoices = (state) =>
  fromInvoices.getIsFetching(state.invoices)

export const getInvoice = (state, id) =>
  fromInvoices.getInvoice(state.invoices, id)

export const getInvoices = (state) => fromInvoices.getInvoices(state.invoices)

export const getInvoiceItem = (state, id) =>
  fromInvoiceItems.getInvoiceItem(state.invoiceItems, id)

export const getInvoiceItems = (state, invoiceId) =>
  fromInvoiceItems.getInvoiceItems(state.invoiceItems, invoiceId)
