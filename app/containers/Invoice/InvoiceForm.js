import React from 'react'

import { Form } from 'components'
import { Invoice } from 'api/entity-schema'
import { InvoiceType } from 'api/enums'
import { formatDate } from 'lib/formatter'

const formLayout = (data) => {
  let layout = [
    [ 'description' ],
    [ 'invoiceDate' ],
    [ 'invoiceNumber' ],
    [ 'beneficiaryName', 'beneficiaryRegistrationNumber' ]
  ]
  if (!data.id) {
    layout.unshift([ 'type' ])
  }
  if (data.type === InvoiceType.SIMPLE) {
    layout.push([ 'amount' ])
  }
  return layout
}

const formOptions = {
  focus: 'description',
  fieldOptions: {
    'type': { size: 4 },
    'description': { size: 9 },
    'invoiceDate': { size: 4, format: formatDate },
    'invoiceNumber': { size: 5 },
    'beneficiaryName': { size: 5 },
    'beneficiaryRegistrationNumber': { size: 4 },
    'amount': { size: 4 }
  }
}

// inject schema to field options
Object.keys(formOptions.fieldOptions).forEach((field) => {
  formOptions.fieldOptions[field].schema = Invoice[field]
})

const InvoiceForm = (props) => (
  <Form layout={formLayout(props.data)} options={formOptions} {...props} />
)

export default InvoiceForm
