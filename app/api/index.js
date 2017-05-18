import fetch from 'isomorphic-fetch'

// enums
const UserRole = { NORMAL: 1, ADMIN: 2 }
const InvoiceType = { SIMPLE: 1, DETAILED: 2 }
export const enums = { UserRole, InvoiceType }

const HOST = 'www.example.com'
const PORT = 3000

export const Auth = {

  current: () => fetch(
    `http://${HOST}:${PORT}/auth`, {
      credentials: 'include'
    }
  ),

  signIn: (email, password) => fetch(
    `http://${HOST}:${PORT}/auth`, {
      credentials: 'include',
      headers: { email, encp: Buffer.from(password).toString('base64') }
    }
  ),

  signOut: () => fetch(
    `http://${HOST}:${PORT}/auth`, {
      method: 'DELETE',
      credentials: 'include'
    }
  )

}

export const Invoice = {

  getOne: (invoiceId) => fetch(
    `http://${HOST}:${PORT}/invoices/${invoiceId}?_embed=items`, {
      credentials: 'include'
    }
  ),

  getAll: (userId) => fetch(
    `http://${HOST}:${PORT}/invoices?userId=${userId}&_embed=items`, {
      credentials: 'include'
    }
  ),

  create: (data) => fetch(
    `http://${HOST}:${PORT}/invoices`, {
      method: 'POST',
      body: data,
      credentials: 'include'
    }
  ),

  update: (invoiceId, data) => fetch(
    `http://${HOST}:${PORT}/invoices/${invoiceId}`, {
      method: 'PUT',
      body: data,
      credentials: 'include'
    }
  ),

  merge: (invoiceId, data) => fetch(
    `http://${HOST}:${PORT}/invoices/${invoiceId}`, {
      method: 'PATCH',
      body: data,
      credentials: 'include'
    }
  ),

  delete: (invoiceId) => fetch(
    `http://${HOST}:${PORT}/invoices/${invoiceId}`, {
      method: 'DELETE',
      credentials: 'include'
    }
  )

}

export const InvoiceItem = {

  create: (data) => fetch(
    `http://${HOST}:${PORT}/items`, {
      method: 'POST',
      body: data,
      credentials: 'include'
    }
  ),

  delete: (invoiceItemId) => fetch(
    `http://${HOST}:${PORT}/items/${invoiceItemId}`, {
      method: 'DELETE',
      credentials: 'include'
    }
  )

}

export const User = {

  getOne: (userId) => fetch(
    `http://${HOST}:${PORT}/users/${userId}`, {
      credentials: 'include'
    }
  ),

  getAll: () => fetch(
    `http://${HOST}:${PORT}/users`, {
      credentials: 'include'
    }
  ),

  create: (data) => fetch(
    `http://${HOST}:${PORT}/users`, {
      method: 'POST',
      body: data,
      credentials: 'include'
    }
  ),

  update: (userId, data) => fetch(
    `http://${HOST}:${PORT}/users/${userId}`, {
      method: 'PUT',
      body: data,
      credentials: 'include'
    }
  ),

  merge: (userId, data) => fetch(
    `http://${HOST}:${PORT}/users/${userId}`, {
      method: 'PATCH',
      body: data,
      credentials: 'include'
    }
  ),

  delete: (userId) => fetch(
    `http://${HOST}:${PORT}/users/${userId}`, {
      method: 'DELETE',
      credentials: 'include'
    }
  )

}
