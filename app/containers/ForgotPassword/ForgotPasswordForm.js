import React from 'react'

import { Form } from 'components'
import { User } from 'api/entity-schema'

const formLayout = [
  [ 'email' ]
]

const formOptions = {
  focus: 'email',
  hideLabels: true,
  fieldOptions: {
    email: {}
  }
}

// inject schema to field options
Object.keys(formOptions.fieldOptions).forEach((field) => {
  formOptions.fieldOptions[field].schema = User[field]
})

const ForgotPasswordForm = ({ data, handleChange }) => (
  <Form
    data={data}
    layout={formLayout}
    options={formOptions}
    handleChange={handleChange} />
)

export default ForgotPasswordForm
