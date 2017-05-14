import React from 'react'

import { ListTable } from '../components'

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

const InvoiceListTable = ({ data, onSelect, onDelete }) => (
  <ListTable
    data={data}
    columns={columns}
    onSelect={onSelect}
    onDelete={onDelete} />
)

export default InvoiceListTable
