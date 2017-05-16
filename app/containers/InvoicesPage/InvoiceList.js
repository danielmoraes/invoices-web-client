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
    key: 'description',
    dataField: 'description',
    dataLabel: 'Description'
  },
  {
    key: 'date',
    dataField: 'date',
    dataLabel: 'Date',
    width: '120'
  },
  {
    key: 'beneficiary',
    dataField: 'beneficiary',
    dataLabel: 'Beneficiary',
    width: '200'
  },
  {
    key: 'amount',
    dataField: 'amount',
    dataLabel: 'Amount',
    dataFormat: (cell, row) => `$ ${cell}`,
    width: '80',
    headerAlign: 'right',
    dataAlign: 'right'
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
