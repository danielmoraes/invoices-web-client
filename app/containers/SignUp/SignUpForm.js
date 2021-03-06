import React from 'react'

import { Form } from 'components'
import { User } from 'api/entity-schema'

const formLayout = [
  [ 'name' ],
  [ 'email' ],
  [ 'password' ],
  [ 'confirmPassword' ]
]

const formOptions = {
  focus: 'name',
  hideLabels: true,
  fieldOptions: {
    name: {},
    email: {},
    password: { inputType: 'password' },
    confirmPassword: { label: 'Confirm Password', inputType: 'password' }
  }
}

// inject schema to field options
Object.keys(formOptions.fieldOptions).forEach((field) => {
  formOptions.fieldOptions[field].schema = User[field]
})

const SignUpForm = (props) => (
  <Form layout={formLayout} options={formOptions} {...props} />
)

export default SignUpForm
