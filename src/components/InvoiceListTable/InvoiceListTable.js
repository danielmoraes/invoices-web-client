import React from 'react'

// components
import { ListTable } from '../'

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

const InvoiceListTable = ({ data, onSelect, onDelete }) => (
  <ListTable
    data={data}
    columns={columns}
    onSelect={onSelect}
    onDelete={onDelete} />
)

export default InvoiceListTable
