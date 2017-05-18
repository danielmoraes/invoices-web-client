import { Auth, Invoice, InvoiceItem, User } from 'api'
import { normalize } from 'normalizr'

import { getAuthUser } from '../reducers'
import * as actionTypes from '../actionTypes'
import * as schema from './schema'

// action creators

export const signInCancel = () => ({
  type: actionTypes.SIGN_IN_CANCEL
})

// async action creators

export const loadAuthUser = () => (dispatch) => {
  dispatch({ type: actionTypes.LOADING_AUTH_USER })
  return Auth.current().then(response => {
    if (response.status === 200) {
      return response.json().then((user) => {
        dispatch({
          type: actionTypes.LOADING_AUTH_USER_SUCCEEDED, payload: user })
        return user
      })
    } else {
      dispatch({ type: actionTypes.LOADING_AUTH_USER_FAILED })
    }
  })
}

export const signIn = (email, password) => (dispatch) => {
  dispatch({ type: actionTypes.SIGNING_IN })
  return Auth.signIn(email, password).then(response => {
    if (response.status === 200) {
      return response.json().then((user) => {
        dispatch({ type: actionTypes.SIGNING_IN_SUCCEEDED, payload: user })
        return user
      })
    } else {
      dispatch({ type: actionTypes.SIGNING_IN_FAILED })
    }
  })
}

export const signOut = () => (dispatch) => {
  dispatch({ type: actionTypes.SIGNING_OUT })
  return Auth.signOut().then(response => {
    if (response.status === 200) {
      dispatch({ type: actionTypes.SIGNING_OUT_SUCCEEDED })
    } else {
      dispatch({ type: actionTypes.SIGNING_OUT_FAILED })
    }
  })
}

export const loadInvoice = (invoiceId) => (dispatch) => {
  dispatch({ type: actionTypes.LOADING_INVOICES })
  return Invoice.getOne(invoiceId).then(response => {
    if (response.status === 200) {
      return response.json().then((invoice) => {
        dispatch({
          type: actionTypes.LOADING_INVOICES_SUCCEEDED,
          payload: normalize(invoice, schema.invoice) })
        return invoice
      })
    } else {
      dispatch({ type: actionTypes.LOADING_INVOICES_FAILED })
    }
  })
}

export const loadInvoices = () => (dispatch, getState) => {
  const user = getAuthUser(getState())
  dispatch({ type: actionTypes.LOADING_INVOICES })
  return Invoice.getAll(user.id).then(response => {
    if (response.status === 200) {
      return response.json().then((invoices) => {
        dispatch({
          type: actionTypes.LOADING_INVOICES_SUCCEEDED,
          payload: normalize(invoices, [ schema.invoice ]) })
        return invoices
      })
    } else {
      dispatch({ type: actionTypes.LOADING_INVOICES_FAILED })
    }
  })
}

export const createInvoice = (data) => (dispatch) => {
  dispatch({ type: actionTypes.CREATING_INVOICE })
  return Invoice.create(data).then(response => {
    if (response.status === 200) {
      response.json().then((invoice) => {
        dispatch({ type: actionTypes.CREATING_INVOICE_SUCCEEDED,
          payload: normalize(invoice, schema.invoice) })
        return invoice
      })
    } else {
      dispatch({ type: actionTypes.CREATING_INVOICE_FAILED })
    }
  })
}

export const deleteInvoice = (invoiceId) => (dispatch) => {
  dispatch({ type: actionTypes.DELETING_INVOICE })
  return Invoice.delete(invoiceId).then(response => {
    if (response.status === 200) {
      dispatch({ type: actionTypes.DELETING_INVOICE_SUCCEEDED, id: invoiceId })
    } else {
      dispatch({ type: actionTypes.DELETING_INVOICE_FAILED })
    }
  })
}

export const deleteInvoiceItem = (invoiceItemId) => (dispatch) => {
  dispatch({ type: actionTypes.DELETING_INVOICE_ITEM })
  return InvoiceItem.delete(invoiceItemId).then(response => {
    if (response.status === 200) {
      dispatch({ type: actionTypes.DELETING_INVOICE_ITEM_SUCCEEDED,
        id: invoiceItemId })
    } else {
      dispatch({ type: actionTypes.DELETING_INVOICE_ITEM_FAILED })
    }
  })
}

export const loadUser = (userId) => (dispatch) => {
  dispatch({ type: actionTypes.LOADING_USERS })
  return User.getOne(userId).then(response => {
    if (response.status === 200) {
      return response.json().then((user) => {
        dispatch({
          type: actionTypes.LOADING_USERS_SUCCEEDED,
          payload: normalize(user, schema.user) })
        return user
      })
    } else {
      dispatch({ type: actionTypes.LOADING_USERS_FAILED })
    }
  })
}

export const loadUsers = () => (dispatch) => {
  dispatch({ type: actionTypes.LOADING_USERS })
  return User.getAll().then(response => {
    if (response.status === 200) {
      return response.json().then((users) => {
        dispatch({
          type: actionTypes.LOADING_USERS_SUCCEEDED,
          payload: normalize(users, [ schema.user ]) })
        return users
      })
    } else {
      dispatch({ type: actionTypes.LOADING_USERS_FAILED })
    }
  })
}

export const deleteUser = (userId) => (dispatch) => {
  dispatch({ type: actionTypes.DELETING_USER })
  return User.delete(userId).then(response => {
    if (response.status === 200) {
      dispatch({ type: actionTypes.DELETING_USER_SUCCEEDED, id: userId })
    } else {
      dispatch({ type: actionTypes.DELETING_USER_FAILED })
    }
  })
}
