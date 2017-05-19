import React from 'react'

import { Form } from 'components'

const formLayout = [
  [ 'newPassword', 'confirmNewPassword' ]
]

const formOptions = {
  focus: 'newPassword',
  fieldOptions: {
    'newPassword': {
      size: 4,
      inputType: 'password',
      label: 'New Password'
    },
    'confirmNewPassword': {
      size: 4,
      inputType: 'password',
      label: 'Confirm New Password'
    }
  }
}

const UserEditPasswordForm = ({ data, handleChange }) => (
  <Form
    data={data}
    layout={formLayout}
    options={formOptions}
    handleChange={handleChange} />
)

export default UserEditPasswordForm
