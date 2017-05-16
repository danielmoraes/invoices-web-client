import { default as React, Component } from 'react'
import { Button, Panel } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

import { SectionHeader } from 'components'
import * as routes from 'routes'

import InvoiceList from './InvoiceList'

const fakeStore = {
  invoices: []
}

function addInvoices (quantity) {
  const startId = fakeStore.invoices.length
  for (let i = quantity - 1; i >= 0; i--) {
    const id = startId + i
    fakeStore.invoices.push({
      id: id,
      description: 'Description of the Invoice #' + id,
      date: '05/07/2017',
      number: '1234567890',
      beneficiary: 'Company Name',
      beneficiaryNumber: '123.456.789.0',
      amount: 10 + i
    })
  }
}

addInvoices(10)

class InvoicesPage extends Component {
  constructor (props) {
    super(props)
    this.state = { invoices: fakeStore.invoices }
    this.onAddClick = this.onAddClick.bind(this)
    this.onItemClick = this.onItemClick.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  onAddClick (event) {
    event.preventDefault()
    const { history } = this.props
    history.push(routes.invoiceNew())
  }

  onItemClick (invoiceId) {
    const { history } = this.props
    history.push(routes.invoice(invoiceId))
  }

  onDeleteClick (invoicesIds) {
    this.setState((prevState) => ({
      invoices: prevState.invoices.filter(
        it => invoicesIds.indexOf(it.id) === -1)
    }))
  }

  render () {
    const { invoices } = this.state

    return (
      <Panel>
        <SectionHeader title='My Invoices'>
          <Button bsStyle='primary' onClick={this.onAddClick}>
            New Invoice
          </Button>
        </SectionHeader>
        <InvoiceList
          data={invoices}
          onItemClick={this.onItemClick}
          onDeleteClick={this.onDeleteClick} />
      </Panel>
    )
  }
}

export default withRouter(InvoicesPage)
