import React from 'react'

import { List } from 'components'
import { InvoiceItem } from 'api/entity-schema'
import { formatPrice } from 'lib/formatter'
import { buildListColumns } from 'lib/generator'

const fields = ['id', 'description', 'quantity', 'unitPrice', 'amount']

const options = {
  id: {
    isKey: true,
    hidden: true
  },
  quantity: {
    width: '80'
  },
  unitPrice: {
    width: '100',
    dataFormat: formatPrice
  },
  amount: {
    width: '80',
    dataFormat: formatPrice
  }
}

const columns = buildListColumns(fields, options, InvoiceItem)

const InvoiceItems = ({ data, onItemClick, onDeleteClick }) => (
  <List
    data={data}
    columns={columns}
    onSelect={onItemClick}
    onDelete={onDeleteClick} />
)

export default InvoiceItems
