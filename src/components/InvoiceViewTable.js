import React from 'react'

// components
import { ViewTable } from './'

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
      value: data.date
    },
    {
      label: 'Number',
      value: data.number
    },
    {
      label: 'Beneficiary',
      value: `${data.beneficiary} (${data.beneficiaryNumber})`
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
