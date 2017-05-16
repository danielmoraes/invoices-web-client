import {
  INVOICE_ID_PARAM,
  INVOICE_ITEM_ID_PARAM,
  USER_ID_PARAM
} from './params'

const INVOICE_ID = ':' + INVOICE_ID_PARAM
const INVOICE_ITEM_ID = ':' + INVOICE_ITEM_ID_PARAM
const USER_ID = ':' + USER_ID_PARAM

// public routes

export const home = () => '/'

export const signIn = () => '/signin'

export const signUp = () => '/signup'

export const forgotPassword = () => '/forgot-password'

// private routes

export const privateRoot = () => '/app'

export const signOut = () => `${privateRoot()}/signout`

export const account = () => `${privateRoot()}/account`

export const accountEdit = () => `${account()}/edit`

export const accountEditPassword = () => `${account()}/edit-password`

export const invoices = () => `${privateRoot()}/invoices`

export const invoiceNew = () => `${invoices()}/new`

export const invoice = (invoiceId = INVOICE_ID) => `${invoices()}/${invoiceId}`

export const invoiceEdit = (invoiceId = INVOICE_ID) =>
  `${invoice(invoiceId)}/edit`

export const invoiceItems = (invoiceId = INVOICE_ID) =>
  `${invoice(invoiceId)}/items`

export const invoiceItemNew = (invoiceId = INVOICE_ID) =>
  `${invoiceItems(invoiceId)}/new`

export const invoiceItem = (
  invoiceId = INVOICE_ID, itemId = INVOICE_ITEM_ID) =>
    `${invoiceItems(invoiceId)}/${itemId}`

export const invoiceItemEdit = (
  invoiceId = INVOICE_ID, itemId = INVOICE_ITEM_ID) =>
    `${invoiceItem(invoiceId, itemId)}/edit`

export const users = () => `${privateRoot()}/users`

export const userNew = () => `${users()}/new`

export const user = (userId = USER_ID) => `${users()}/${userId}`

export const userEdit = (userId = USER_ID) => `${user(userId)}/edit`

export const userEditPassword = (userId = USER_ID) =>
  `${user(userId)}/edit-password`
