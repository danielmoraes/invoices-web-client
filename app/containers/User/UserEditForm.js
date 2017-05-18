import React from 'react'

import { Form } from 'components'
import { User } from 'api/entity-schema'

const formLayout = [
  [ 'name' ],
  [ 'email' ]
]

const formOptions = {
  focus: 'name',
  fieldOptions: {
    'name': { size: 6 },
    'email': { size: 6, inputType: 'email' }
  }
}

// inject schema to field options
Object.keys(formOptions.fieldOptions).forEach((field) => {
  formOptions.fieldOptions[field].schema = User[field]
})

const UserEditForm = ({ data, handleChange }) => (
  <Form
    data={data}
    layout={formLayout}
    options={formOptions}
    handleChange={handleChange} />
)

export default UserEditForm
