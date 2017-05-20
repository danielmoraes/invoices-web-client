import { combineReducers } from 'redux'

import appReducer, * as fromApp from './app'
import authReducer, * as fromAuth from './auth'
import invoicesReducer, * as fromInvoices from './invoices'
import invoiceItemsReducer, * as fromInvoiceItems from './invoiceItems'
import usersReducer, * as fromUsers from './users'

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  invoices: invoicesReducer,
  invoiceItems: invoiceItemsReducer,
  users: usersReducer
})

export default rootReducer

// app reducer selectors

export const getIsLoaded = (state) => fromApp.getIsLoaded(state.app)

export const getSignInFailed = (state) => fromApp.getSignInFailed(state.app)

export const getShowLoadingOverlay = (state) =>
  fromApp.getShowLoadingOverlay(state.app)

export const getIsFetching = (state) => fromApp.getIsFetching(state.app)

// auth reducer selectors

export const getIsAuthenticated = (state) =>
  fromAuth.getIsAuthenticated(state.auth)

export const getIsSigningOut = (state) => fromAuth.getIsSigningOut(state.auth)

export const getAuthUser = (state) => fromAuth.getUser(state.auth)

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

// users reducer selectors

export const getIsFetchingUsers = (state) =>
  fromUsers.getIsFetching(state.users)

export const getUser = (state, id) => fromUsers.getUser(state.users, id)

export const getUsers = (state, id) => fromUsers.getUsers(state.users)
