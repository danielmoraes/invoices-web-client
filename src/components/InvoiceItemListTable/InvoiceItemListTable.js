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
    key: 'quantity',
    dataField: 'quantity',
    dataLabel: 'Quantity',
    width: '80',
    headerAlign: 'right',
    dataAlign: 'right'
  },
  {
    key: 'unitPrice',
    dataField: 'unitPrice',
    dataLabel: 'Unit Price',
    dataFormat: (cell, row) => `$ ${cell}`,
    width: '100',
    headerAlign: 'right',
    dataAlign: 'right'
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

const InvoiceItemListTable = ({ data, onAdd, onSelect, onDelete }) => (
  <ListTable
    data={data}
    columns={columns}
    onAdd={onAdd}
    onSelect={onSelect}
    onDelete={onDelete} />
)

export default InvoiceItemListTable
