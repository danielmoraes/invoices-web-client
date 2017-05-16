import React from 'react'

import { List } from 'components'

const columns = [
  { key: 1, dataField: 'id', dataLabel: 'ID', isKey: true, hidden: true },
  { key: 2, dataField: 'description', dataLabel: 'Description' },
  { key: 3, dataField: 'invoiceDate', dataLabel: 'Date' },
  { key: 4, dataField: 'beneficiary', dataLabel: 'Beneficiary' },
  {
    key: 5,
    dataField: 'amount',
    dataLabel: 'Amount',
    headerAlign: 'right',
    dataAlign: 'right',
    dataFormat: (cell, row) => `$ ${cell}`
  }
]

const InvoiceList = ({ data, onItemClick, onDeleteClick }) => (
  <List
    data={data}
    columns={columns}
    onSelect={onItemClick}
    onDelete={onDeleteClick} />
)

export default InvoiceList
