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

const UserEditPasswordForm = (props) => (
  <Form layout={formLayout} options={formOptions} {...props} />
)

export default UserEditPasswordForm
