import React from 'react'

import { Details } from 'components'

const InvoiceDetails = ({ data }) => {
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
    <Details data={dataWithLabels} />
  )
}

export default InvoiceDetails
