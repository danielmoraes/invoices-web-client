import React from 'react'

import { Form } from 'components'
import { Invoice } from 'api/entity-schema'
import { formatDate } from 'lib/formatter'

const formLayout = [
  [ 'description' ],
  [ 'invoiceDate' ],
  [ 'invoiceNumber' ],
  [ 'beneficiaryName', 'beneficiaryRegistrationNumber' ],
  [ 'amount' ]
]

const formOptions = {
  focus: 'description',
  fieldOptions: {
    'description': { size: 8 },
    'invoiceDate': { size: 3, format: formatDate },
    'invoiceNumber': { size: 3 },
    'beneficiaryName': { size: 5 },
    'beneficiaryRegistrationNumber': { size: 3 },
    'amount': { size: 3 }
  }
}

// inject schema to field options
Object.keys(formOptions.fieldOptions).forEach((field) => {
  formOptions.fieldOptions[field].schema = Invoice[field]
})

const InvoiceForm = ({ data, handleChange }) => (
  <Form
    data={data}
    layout={formLayout}
    options={formOptions}
    handleChange={handleChange} />
)

export default InvoiceForm
