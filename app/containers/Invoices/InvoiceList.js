import React from 'react'

import { List } from 'components'
import { Invoice } from 'api/entity-schema'
import { formatPrice, formatDate } from 'lib/formatter'
import { buildListColumns } from 'lib/generator'

const fields = ['id', 'description', 'invoiceDate', 'beneficiaryName', 'amount']

const options = {
  id: {
    isKey: true,
    hidden: true
  },
  invoiceDate: {
    dataFormat: formatDate
  },
  amount: {
    dataFormat: formatPrice
  }
}

const columns = buildListColumns(fields, options, Invoice)

const InvoiceList = ({ data, onItemClick, onDeleteClick }) => (
  <List
    data={data}
    columns={columns}
    onSelect={onItemClick}
    onDelete={onDeleteClick} />
)

export default InvoiceList
