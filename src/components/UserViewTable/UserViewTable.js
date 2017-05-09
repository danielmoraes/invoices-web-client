import React from 'react'
import { withRouter } from 'react-router-dom'

// components
import { ViewTable } from '../'

const UserViewTable = ({ data, match }) => {
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
      path: `${match.url}/edit-password`
    }
  ]

  return (
    <ViewTable data={dataWithLabels} />
  )
}

export default withRouter(UserViewTable)
