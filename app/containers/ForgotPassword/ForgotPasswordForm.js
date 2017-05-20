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

const ForgotPasswordForm = (props) => (
  <Form layout={formLayout} options={formOptions} {...props} />
)

export default ForgotPasswordForm
