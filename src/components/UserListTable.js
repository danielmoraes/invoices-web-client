import React from 'react'

import { ListTable } from '../components'

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

const UserListTable = ({ data, onSelect, onDelete }) => (
  <ListTable
    data={data}
    columns={columns}
    onSelect={onSelect}
    onDelete={onDelete} />
)

export default UserListTable
