import { normalize } from 'normalizr'

import { Auth, Invoice } from '../api'
import { getUser } from '../reducers'
import * as schema from './schema'
import * as constants from '../constants'

// action creators

export const signInCancel = () => ({
  type: constants.SIGN_IN_CANCEL
})

// async action creators

export const loadAuthUser = () => (dispatch) => {
  dispatch({ type: constants.LOADING_AUTH_USER })
  return Auth.current().then(response => {
    if (response.status === 200) {
      response.json().then((user) => {
        dispatch({ type: constants.LOADING_AUTH_USER_SUCCEEDED, payload: user })
      })
    } else {
      dispatch({ type: constants.LOADING_AUTH_USER_FAILED })
    }
  })
}

export const signIn = (email, password) => (dispatch) => {
  dispatch({ type: constants.SIGNING_IN })
  return Auth.signIn(email, password).then(response => {
    if (response.status === 200) {
      response.json().then((user) => {
        dispatch({ type: constants.SIGNING_IN_SUCCEEDED, payload: user })
      })
    } else {
      dispatch({ type: constants.SIGNING_IN_FAILED })
    }
  })
}

export const signOut = () => (dispatch) => {
  dispatch({ type: constants.SIGNING_OUT })
  return Auth.signOut().then(response => {
    if (response.status === 200) {
      dispatch({ type: constants.SIGNING_OUT_SUCCEEDED })
    } else {
      dispatch({ type: constants.SIGNING_OUT_FAILED })
    }
  })
}

export const loadInvoice = (invoiceId) => (dispatch) => {
  dispatch({ type: constants.LOADING_INVOICES })
  return Invoice.getOne(invoiceId).then(response => {
    if (response.status === 200) {
      response.json().then((invoice) => {
        dispatch({ type: constants.LOADING_INVOICES_SUCCEEDED,
          payload: normalize(invoice, schema.invoice) })
      })
    } else {
      dispatch({ type: constants.LOADING_INVOICES_FAILED })
    }
  })
}

export const loadInvoices = () => (dispatch, getState) => {
  const user = getUser(getState())
  dispatch({ type: constants.LOADING_INVOICES })
  return Invoice.getAll(user.id).then(response => {
    if (response.status === 200) {
      response.json().then((invoices) => {
        dispatch({ type: constants.LOADING_INVOICES_SUCCEEDED,
          payload: normalize(invoices, [ schema.invoice ]) })
      })
    } else {
      dispatch({ type: constants.LOADING_INVOICES_FAILED })
    }
  })
}

export const createInvoice = (data) => (dispatch) => {
  dispatch({ type: constants.CREATING_INVOICE })
  return Invoice.create(data).then(response => {
    if (response.status === 200) {
      response.json().then((invoice) => {
        dispatch({ type: constants.CREATING_INVOICE_SUCCEEDED,
          payload: normalize(invoice, schema.invoice) })
      })
    } else {
      dispatch({ type: constants.CREATING_INVOICE_FAILED })
    }
  })
}

export const deleteInvoice = (invoiceId) => (dispatch) => {
  dispatch({ type: constants.DELETING_INVOICE })
  return Invoice.delete(invoiceId).then(response => {
    if (response.status === 200) {
      dispatch({ type: constants.DELETING_INVOICE_SUCCEEDED, id: invoiceId })
    } else {
      dispatch({ type: constants.DELETING_INVOICE_FAILED })
    }
  })
}
