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
    'name': { size: 8 },
    'email': { size: 8, inputType: 'email' }
  }
}

// inject schema to field options
Object.keys(formOptions.fieldOptions).forEach((field) => {
  formOptions.fieldOptions[field].schema = User[field]
})

const UserEditForm = (props) => (
  <Form layout={formLayout} options={formOptions} {...props} />
)

export default UserEditForm
