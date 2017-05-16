import React from 'react'

import { Details } from 'components'

const UserDetails = ({ data, editPasswordRoute }) => {
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
    <Details data={dataWithLabels} />
  )
}

export default UserDetails
