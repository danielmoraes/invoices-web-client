export const Invoice = {
  id: {
    type: Number,
    label: 'ID',
    hidden: true
  },
  userId: {
    type: Number,
    label: 'User ID',
    hidden: true
  },
  type: {
    type: Array,
    label: 'Invoice Type',
    values: ['SIMPLE', 'DETAILED'],
    default: 'SIMPLE'
  },
  description: {
    type: String,
    label: 'Description'
  },
  invoiceDate: {
    type: Date,
    label: 'Invoice Date'
  },
  invoiceNumber: {
    type: String,
    label: 'Invoice Number'
  },
  beneficiaryName: {
    type: String,
    label: 'Beneficiary Name'
  },
  beneficiaryRegistrationNumber: {
    type: String,
    label: 'Beneficiary Number'
  },
  amount: {
    type: Number,
    label: 'Amount'
  }
}

export const InvoiceItem = {
  id: {
    type: Number,
    label: 'ID',
    hidden: true
  },
  invoiceId: {
    type: Number,
    label: 'Invoice ID',
    hidden: true
  },
  description: {
    type: String,
    label: 'Description'
  },
  quantity: {
    type: Number,
    label: 'Quantity',
    default: 1
  },
  unitPrice: {
    type: Number,
    label: 'Unit Price'
  },
  amount: {
    type: Number,
    label: 'Amount',
    hidden: true
  }
}

export const User = {
  id: {
    type: Number,
    label: 'ID',
    hidden: true
  },
  email: {
    type: String,
    label: 'Email'
  },
  password: {
    type: String,
    label: 'Password'
  },
  name: {
    type: String,
    label: 'Name'
  },
  role: {
    type: Array,
    label: 'Role',
    values: ['NORMAL', 'ADMIN'],
    default: 'NORMAL'
  }
}
