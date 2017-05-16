import { schema } from 'normalizr'

export const invoiceItem = new schema.Entity('invoiceItems')
export const invoice = new schema.Entity('invoices', {
  items: [ invoiceItem ]
})
export const user = new schema.Entity('users')
