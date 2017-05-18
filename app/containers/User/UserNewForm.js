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
    'name': {
      size: 6
    },
    'email': {
      size: 6,
      inputType: 'email'
    },
    'password': {
      size: 3,
      inputType: 'password'
    },
    'confirmPassword': {
      size: 3,
      label: 'Confirm Password',
      inputType: 'password'
    }
  }
}

// inject schema to field options
Object.keys(formOptions.fieldOptions).forEach((field) => {
  formOptions.fieldOptions[field].schema = User[field]
})

const UserNewForm = ({ data, handleChange }) => (
  <Form
    data={data}
    layout={formLayout}
    options={formOptions}
    handleChange={handleChange} />
)

export default UserNewForm
