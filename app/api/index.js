import fetch from 'isomorphic-fetch'

// enums
const UserRole = { NORMAL: 1, ADMIN: 2 }
const InvoiceType = { SIMPLE: 1, DETAILED: 2 }
export const enums = { UserRole, InvoiceType }

const BASE_URL = 'http://www.example.com:3000'

export const Auth = {

  current: () => fetch(
    `${BASE_URL}/auth`, {
      credentials: 'include'
    }
  ),

  signIn: (email, password) => fetch(
    `${BASE_URL}/auth`, {
      credentials: 'include',
      headers: { email, encp: Buffer.from(password).toString('base64') }
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
      body: data,
      credentials: 'include'
    }
  ),

  update: (invoiceId, data) => fetch(
    `${BASE_URL}/invoices/${invoiceId}`, {
      method: 'PUT',
      body: data,
      credentials: 'include'
    }
  ),

  merge: (invoiceId, data) => fetch(
    `${BASE_URL}/invoices/${invoiceId}`, {
      method: 'PATCH',
      body: data,
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
      body: data,
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

  create: (data) => fetch(
    `${BASE_URL}/users`, {
      method: 'POST',
      body: data,
      credentials: 'include'
    }
  ),

  update: (userId, data) => fetch(
    `${BASE_URL}/users/${userId}`, {
      method: 'PUT',
      body: data,
      credentials: 'include'
    }
  ),

  merge: (userId, data) => fetch(
    `${BASE_URL}/users/${userId}`, {
      method: 'PATCH',
      body: data,
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
