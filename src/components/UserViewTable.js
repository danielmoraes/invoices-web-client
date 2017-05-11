import React from 'react'
import { withRouter } from 'react-router-dom'

// components
import { ViewTable } from './'

// constants
import { USER_ID_PARAM } from '../constants'

// app routes
import * as routes from '../routes'

const UserViewTable = ({ data, match }) => {
  const userId = match.params[USER_ID_PARAM]
  const editPasswordRoute = userId
    ? routes.userEditPassword(userId) : routes.accountEditPassword()

  const dataWithLabels = [
    {
      label: 'Name',
      value: data.name
    },
    {
      label: 'Email',
      value: data.email
    },
    {
      label: 'Password',
      value: 'Edit Password',
      path: editPasswordRoute
    }
  ]

  return (
    <ViewTable data={dataWithLabels} />
  )
}

export default withRouter(UserViewTable)
