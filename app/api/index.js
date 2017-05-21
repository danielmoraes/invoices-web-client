import fetch from 'isomorphic-fetch'

let BASE_URL = ''

if (process.env.NODE_ENV === 'test') {
  BASE_URL = 'http://localhost'
} else {
  BASE_URL = ((host) => `http://${host}:12336`)(document.location.hostname)
}

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

  create: (invoiceId, data) => fetch(
    `${BASE_URL}/invoices/${invoiceId}/items`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      credentials: 'include'
    }
  ),

  update: (invoiceId, invoiceItemId, data) => fetch(
    `${BASE_URL}/invoices/${invoiceId}/items/${invoiceItemId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data),
      credentials: 'include'
    }
  ),

  delete: (invoiceId, invoiceItemId) => fetch(
    `${BASE_URL}/invoices/${invoiceId}/items/${invoiceItemId}`, {
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
  ),

  updateUserPassword: (userId, newPassword, currentPassword) => fetch(
    `${BASE_URL}/users/${userId}`, {
      method: 'PATCH',
      headers: {
        'encp': newPassword,
        'encp-old': currentPassword
      },
      credentials: 'include'
    }
  )

}
