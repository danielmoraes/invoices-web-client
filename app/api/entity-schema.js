export const Invoice = {
  id: { type: Number, label: 'ID' },
  description: { type: String, label: 'Description' },
  invoiceDate: { type: Date, label: 'Invoice Date' },
  invoiceNumber: { type: Number, label: 'Invoice Number' },
  beneficiaryName: { type: String, label: 'Beneficiary' },
  beneficiaryRegistrationNumber: { type: Number, label: 'Beneficiary Number' },
  amount: { type: Number, label: 'Amount' }
}

export const InvoiceItem = {
  id: { type: Number, label: 'ID' },
  description: { type: String, label: 'Description' },
  quantity: { type: Number, label: 'Quantity' },
  unitPrice: { type: Number, label: 'Unit Price' },
  amount: { type: Number, label: 'Amount' }
}

export const User = {
  id: { type: Number, label: 'ID' },
  email: { type: String, label: 'Email' },
  password: { type: String, label: 'Password' },
  name: { type: String, label: 'Name' },
  role: { type: String, label: 'Role' }
}
