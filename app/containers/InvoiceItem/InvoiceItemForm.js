import React from 'react'

import { Form } from 'components'
import { InvoiceItem } from 'api/entity-schema'

const formLayout = [
  [ 'description' ],
  [ 'quantity', 'unitPrice' ]
]

const formOptions = {
  focus: 'description',
  fieldOptions: {
    description: { },
    quantity: { size: 4 },
    unitPrice: { size: 4 }
  }
}

// inject schema to field options
Object.keys(formOptions.fieldOptions).forEach((field) => {
  formOptions.fieldOptions[field].schema = InvoiceItem[field]
})

const ItemForm = (props) => (
  <Form layout={formLayout} options={formOptions} {...props} />
)

export default ItemForm
