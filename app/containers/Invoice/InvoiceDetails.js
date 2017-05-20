import React from 'react'

import { Details } from 'components'
import { Invoice } from 'api/entity-schema'
import { formatPrice, formatDate } from 'lib/formatter'

const InvoiceDetails = ({ data }) => {
  const dataWithLabels = [
    {
      label: Invoice.id.label,
      value: data.id
    },
    {
      label: Invoice.description.label,
      value: data.description
    },
    {
      label: Invoice.invoiceDate.label,
      value: formatDate(data.invoiceDate)
    },
    {
      label: Invoice.invoiceNumber.label,
      value: data.invoiceNumber
    },
    {
      label: 'Beneficiary',
      value: `${data.beneficiaryName} (${data.beneficiaryRegistrationNumber})`
    },
    {
      label: Invoice.amount.label,
      value: formatPrice(data.amount)
    }
  ]

  return (
    <Details data={dataWithLabels} />
  )
}

export default InvoiceDetails
