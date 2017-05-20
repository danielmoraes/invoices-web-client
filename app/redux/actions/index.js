import { Auth, Invoice, InvoiceItem, User } from 'api'
import { normalize } from 'normalizr'

import { stringToBase64 } from 'lib/converter'
import { getAuthUser } from 'redux/reducers'
import * as actionTypes from 'redux/actionTypes'

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
      return response.json().then(user => {
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
  const encp = stringToBase64(password)
  dispatch({ type: actionTypes.SIGNING_IN })
  return Auth.signIn(email, encp).then(response => {
    if (response.status === 200) {
      return response.json().then(user => {
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
  dispatch({ type: actionTypes.FETCHING })
  dispatch({ type: actionTypes.LOADING_INVOICES })
  return Invoice.getOne(invoiceId).then(response => {
    dispatch({ type: actionTypes.FETCHING_ENDED })
    if (response.status === 200) {
      return response.json().then(invoice => {
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
  // --- THE USER_ID IS ONLY NEEDED IN THE FAKE API
  const user = getAuthUser(getState())

  dispatch({ type: actionTypes.FETCHING })
  dispatch({ type: actionTypes.LOADING_INVOICES })
  return Invoice.getAll(user.id).then(response => {
    dispatch({ type: actionTypes.FETCHING_ENDED })
    if (response.status === 200) {
      return response.json().then(invoices => {
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

export const createInvoice = (data) => (dispatch, getState) => {
  data.userId = getAuthUser(getState()).id
  dispatch({ type: actionTypes.FETCHING })
  dispatch({ type: actionTypes.CREATING_INVOICE, payload: data })
  return Invoice.create(data).then(response => {
    dispatch({ type: actionTypes.FETCHING_ENDED })
    if (response.status === 201) {
      return response.json().then(invoice => {
        dispatch({
          type: actionTypes.CREATING_INVOICE_SUCCEEDED,
          payload: normalize(invoice, schema.invoice) })
        return invoice
      })
    } else {
      dispatch({ type: actionTypes.CREATING_INVOICE_FAILED })
    }
  })
}

export const updateInvoice = (invoiceId, data, merge = false) => (dispatch) => {
  dispatch({ type: actionTypes.FETCHING })
  dispatch({ type: actionTypes.UPDATING_INVOICE, payload: data })
  const api = merge ? Invoice.merge : Invoice.update
  return api(invoiceId, data).then(response => {
    dispatch({ type: actionTypes.FETCHING_ENDED })
    if (response.status === 200) {
      return response.json().then(invoice => {
        dispatch({
          type: actionTypes.UPDATING_INVOICE_SUCCEEDED,
          payload: normalize(invoice, schema.invoice) })
        return invoice
      })
    } else {
      dispatch({ type: actionTypes.UPDATING_INVOICE_FAILED })
    }
  })
}

export const mergeInvoice = (invoiceId, data) =>
  updateInvoice(invoiceId, data, true)

export const deleteInvoice = (invoiceId) => (dispatch) => {
  dispatch({ type: actionTypes.FETCHING })
  dispatch({ type: actionTypes.DELETING_INVOICE })
  return Invoice.delete(invoiceId).then(response => {
    dispatch({ type: actionTypes.FETCHING_ENDED })
    if (response.status === 200) {
      dispatch({ type: actionTypes.DELETING_INVOICE_SUCCEEDED, id: invoiceId })
      return invoiceId
    } else {
      dispatch({ type: actionTypes.DELETING_INVOICE_FAILED })
    }
  })
}

export const createInvoiceItem = (data) => (dispatch) => {
  dispatch({ type: actionTypes.FETCHING })
  dispatch({ type: actionTypes.CREATING_INVOICE_ITEM, payload: data })
  return InvoiceItem.create(data).then(response => {
    dispatch({ type: actionTypes.FETCHING_ENDED })
    if (response.status === 201) {
      return response.json().then(invoiceItem => {
        dispatch({
          type: actionTypes.CREATING_INVOICE_ITEM_SUCCEEDED,
          payload: normalize(invoiceItem, schema.invoiceItem),
          invoiceId: invoiceItem.invoiceId,
          invoiceAmount: response.headers.get('invoice-amount') })
        return invoiceItem
      })
    } else {
      dispatch({ type: actionTypes.CREATING_INVOICE_ITEM_FAILED })
    }
  })
}

export const updateInvoiceItem =
  (invoiceId, invoiceItemId, data, merge = false) => (dispatch) => {
    dispatch({ type: actionTypes.FETCHING })
    dispatch({ type: actionTypes.UPDATING_INVOICE_ITEM, payload: data })
    const api = merge ? InvoiceItem.merge : InvoiceItem.update
    return api(invoiceItemId, data).then(response => {
      dispatch({ type: actionTypes.FETCHING_ENDED })
      if (response.status === 200) {
        return response.json().then(invoiceItem => {
          dispatch({
            type: actionTypes.UPDATING_INVOICE_ITEM_SUCCEEDED,
            payload: normalize(invoiceItem, schema.invoiceItem),
            invoiceId: invoiceId,
            invoiceAmount: response.headers.get('invoice-amount') })
          return invoiceItem
        })
      } else {
        dispatch({ type: actionTypes.UPDATING_INVOICE_ITEM_FAILED })
      }
    })
  }

export const mergeInvoiceItem = (invoiceId, invoiceItemId, data) =>
  updateInvoiceItem(invoiceId, invoiceItemId, data, true)

export const deleteInvoiceItem = (invoiceId, invoiceItemId) => (dispatch) => {
  dispatch({ type: actionTypes.FETCHING })
  dispatch({ type: actionTypes.DELETING_INVOICE_ITEM })
  return InvoiceItem.delete(invoiceItemId).then(response => {
    dispatch({ type: actionTypes.FETCHING_ENDED })
    if (response.status === 200) {
      dispatch({
        type: actionTypes.DELETING_INVOICE_ITEM_SUCCEEDED,
        id: invoiceItemId,
        invoiceId: invoiceId,
        invoiceAmount: response.headers.get('invoice-amount') })
      return invoiceItemId
    } else {
      dispatch({ type: actionTypes.DELETING_INVOICE_ITEM_FAILED })
    }
  })
}

export const loadUser = (userId) => (dispatch) => {
  dispatch({ type: actionTypes.FETCHING })
  dispatch({ type: actionTypes.LOADING_USERS })
  return User.getOne(userId).then(response => {
    dispatch({ type: actionTypes.FETCHING_ENDED })
    if (response.status === 200) {
      return response.json().then(user => {
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
  dispatch({ type: actionTypes.FETCHING })
  dispatch({ type: actionTypes.LOADING_USERS })
  return User.getAll().then(response => {
    dispatch({ type: actionTypes.FETCHING_ENDED })
    if (response.status === 200) {
      return response.json().then(users => {
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

export const createUser = (data, password) => (dispatch) => {
  const encp = stringToBase64(password)

  // THIS IS ONLY NEEDED IN THE FAKE API
  data.password = password

  dispatch({ type: actionTypes.FETCHING })
  dispatch({ type: actionTypes.CREATING_USER, payload: data })
  return User.create(data, encp).then(response => {
    dispatch({ type: actionTypes.FETCHING_ENDED })
    if (response.status === 201) {
      return response.json().then(user => {
        dispatch({
          type: actionTypes.CREATING_USER_SUCCEEDED,
          payload: normalize(user, schema.user) })
        return user
      })
    } else {
      dispatch({ type: actionTypes.CREATING_USER_FAILED })
    }
  })
}

export const updateUser = (userId, data, merge = false) => (dispatch) => {
  dispatch({ type: actionTypes.FETCHING })
  dispatch({ type: actionTypes.UPDATING_USER, payload: data })
  const api = merge ? User.merge : User.update
  return api(userId, data).then(response => {
    dispatch({ type: actionTypes.FETCHING_ENDED })
    if (response.status === 200) {
      return response.json().then(user => {
        dispatch({
          type: actionTypes.UPDATING_USER_SUCCEEDED,
          payload: normalize(user, schema.user) })
        return user
      })
    } else {
      dispatch({ type: actionTypes.UPDATING_USER_FAILED })
    }
  })
}

export const mergeUser = (userId, data) => updateUser(userId, data, true)

export const deleteUser = (userId) => (dispatch) => {
  dispatch({ type: actionTypes.FETCHING })
  dispatch({ type: actionTypes.DELETING_USER })
  return User.delete(userId).then(response => {
    dispatch({ type: actionTypes.FETCHING_ENDED })
    if (response.status === 200) {
      dispatch({ type: actionTypes.DELETING_USER_SUCCEEDED, id: userId })
      return userId
    } else {
      dispatch({ type: actionTypes.DELETING_USER_FAILED })
    }
  })
}

export const updateUserPassword =
  (userId, newPassword, currentPassword) => (dispatch) => {
    const encp = newPassword ? stringToBase64(newPassword) : ''
    const encpOld = currentPassword ? stringToBase64(currentPassword) : ''
    dispatch({ type: actionTypes.FETCHING })
    dispatch({ type: actionTypes.UPDATING_USER_PASSWORD })
    return User.updateUserPassword(userId, encp, encpOld).then(response => {
      dispatch({ type: actionTypes.FETCHING_ENDED })
      if (response.status === 200) {
        dispatch({ type: actionTypes.UPDATING_USER_PASSWORD_SUCCEEDED })
      } else {
        dispatch({ type: actionTypes.UPDATING_USER_PASSWORD_FAILED })
      }
    })
  }
