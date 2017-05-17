import React from 'react'

import { List } from 'components'

const columns = [
  {
    key: 'id',
    dataField: 'id',
    dataLabel: 'ID',
    isKey: true,
    hidden: true
  },
  {
    key: 'name',
    dataField: 'name',
    dataLabel: 'Name'
  },
  {
    key: 'email',
    dataField: 'email',
    dataLabel: 'Email',
    width: '300'
  }
]

const UserList = ({ data, onItemClick, onDeleteClick }) => (
  <List
    data={data}
    columns={columns}
    onSelect={onItemClick}
    onDelete={onDeleteClick} />
)

export default UserList
