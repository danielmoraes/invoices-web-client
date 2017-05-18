import React from 'react'

import { List } from 'components'
import { User } from 'api/entity-schema'
import { buildListColumns } from 'lib/generator'

const fields = ['id', 'name', 'email']

const options = {
  id: {
    isKey: true,
    hidden: true
  },
  email: {
    width: '300'
  }
}

const columns = buildListColumns(fields, options, User)

const UserList = ({ data, onItemClick, onDeleteClick }) => (
  <List
    data={data}
    columns={columns}
    onSelect={onItemClick}
    onDelete={onDeleteClick} />
)

export default UserList
