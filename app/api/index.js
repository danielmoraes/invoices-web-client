import fetch from 'isomorphic-fetch'

const BASE_URL = 'http://www.example.com:3000'

export const Auth = {

  current: () => fetch(
    `${BASE_URL}/auth`, {
      credentials: 'include'
    }
  ),

  signIn: (email, encp) => fetch(
    `${BASE_URL}/auth`, {
      headers: { email, encp },
      credentials: 'include'
    }
  ),

  signOut: () => fetch(
    `${BASE_URL}/auth`, {
      method: 'DELETE',
      credentials: 'include'
    }
  )

}

export const Invoice = {

  getOne: (invoiceId) => fetch(
    `${BASE_URL}/invoices/${invoiceId}?_embed=items`, {
      credentials: 'include'
    }
  ),

  getAll: (userId) => fetch(
    `${BASE_URL}/invoices?userId=${userId}&_embed=items`, {
      credentials: 'include'
    }
  ),

  create: (data) => fetch(
    `${BASE_URL}/invoices`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      credentials: 'include'
    }
  ),

  update: (invoiceId, data) => fetch(
    `${BASE_URL}/invoices/${invoiceId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      credentials: 'include'
    }
  ),

  merge: (invoiceId, data) => fetch(
    `${BASE_URL}/invoices/${invoiceId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      credentials: 'include'
    }
  ),

  delete: (invoiceId) => fetch(
    `${BASE_URL}/invoices/${invoiceId}`, {
      method: 'DELETE',
      credentials: 'include'
    }
  )

}

export const InvoiceItem = {

  create: (data) => fetch(
    `${BASE_URL}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      credentials: 'include'
    }
  ),

  update: (invoiceItemId, data) => fetch(
    `${BASE_URL}/items/${invoiceItemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      credentials: 'include'
    }
  ),

  delete: (invoiceItemId) => fetch(
    `${BASE_URL}/items/${invoiceItemId}`, {
      method: 'DELETE',
      credentials: 'include'
    }
  )

}

export const User = {

  getOne: (userId) => fetch(
    `${BASE_URL}/users/${userId}`, {
      credentials: 'include'
    }
  ),

  getAll: () => fetch(
    `${BASE_URL}/users`, {
      credentials: 'include'
    }
  ),

  create: (data, encp) => fetch(
    `${BASE_URL}/users`, {
      method: 'POST',
      headers: {
        encp,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      credentials: 'include'
    }
  ),

  update: (userId, data) => fetch(
    `${BASE_URL}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      credentials: 'include'
    }
  ),

  merge: (userId, data) => fetch(
    `${BASE_URL}/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      credentials: 'include'
    }
  ),

  delete: (userId) => fetch(
    `${BASE_URL}/users/${userId}`, {
      method: 'DELETE',
      credentials: 'include'
    }
  )

}
