import React from 'react'

import { Form } from 'components'
import { User } from 'api/entity-schema'

const formLayout = [
  [ 'name' ],
  [ 'email' ],
  [ 'password', 'confirmPassword' ]
]

const formOptions = {
  focus: 'name',
  fieldOptions: {
    name: {
      size: 8
    },
    email: {
      size: 8,
      inputType: 'email'
    },
    password: {
      size: 4,
      inputType: 'password'
    },
    confirmPassword: {
      size: 4,
      label: 'Confirm Password',
      inputType: 'password'
    }
  }
}

// inject schema to field options
Object.keys(formOptions.fieldOptions).forEach((field) => {
  formOptions.fieldOptions[field].schema = User[field]
})

const UserNewForm = (props) => (
  <Form layout={formLayout} options={formOptions} {...props} />
)

export default UserNewForm
