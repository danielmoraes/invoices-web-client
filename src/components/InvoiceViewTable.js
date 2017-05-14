import React from 'react'

import { ViewTable } from '../components'

const InvoiceViewTable = ({ data }) => {
  const dataWithLabels = [
    {
      label: 'ID',
      value: data.id
    },
    {
      label: 'Description',
      value: data.description
    },
    {
      label: 'Date',
      value: data.invoiceDate
    },
    {
      label: 'Number',
      value: data.invoiceNumber
    },
    {
      label: 'Beneficiary',
      value: `${data.beneficiaryName} (${data.beneficiaryNumber})`
    },
    {
      label: 'Amount',
      value: data.amount
    }
  ]

  return (
    <ViewTable data={dataWithLabels} />
  )
}

export default InvoiceViewTable
