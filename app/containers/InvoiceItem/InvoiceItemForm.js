import React from 'react'

import { Form } from 'components'
import { InvoiceItem } from 'api/entity-schema'

const formLayout = [
  [ 'description' ],
  [ 'quantity', 'unitPrice', 'amount' ]
]

const formOptions = {
  focus: 'description',
  fieldOptions: {
    description: { size: 6 },
    quantity: { size: 2 },
    unitPrice: { size: 2 },
    amount: { size: 2 }
  }
}

// inject schema to field options
Object.keys(formOptions.fieldOptions).forEach((field) => {
  formOptions.fieldOptions[field].schema = InvoiceItem[field]
})

const ItemForm = ({ data, handleChange }) => (
  <Form
    data={data}
    layout={formLayout}
    options={formOptions}
    handleChange={handleChange} />
)

export default ItemForm
