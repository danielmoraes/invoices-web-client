import React from 'react'

import { Form } from 'components'

const formLayout = [
  [ 'currentPassword' ],
  [ 'newPassword', 'confirmNewPassword' ]
]

const formOptions = {
  focus: 'currentPassword',
  fieldOptions: {
    'currentPassword': {
      size: 4,
      inputType: 'password',
      label: 'Current Password'
    },
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

const AccountEditPasswordForm = (props) => (
  <Form layout={formLayout} options={formOptions} {...props} />
)

export default AccountEditPasswordForm
