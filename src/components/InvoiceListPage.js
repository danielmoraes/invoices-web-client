import { default as React, Component } from 'react'
import { Button, Panel } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

// components
import { InvoiceListTable, PanelHeader } from './'

// app routes
import * as routes from '../routes'

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

class InvoiceListPage extends Component {
  constructor (props) {
    super(props)
    this.state = { invoices: fakeStore.invoices }
    this.onAdd = this.onAdd.bind(this)
    this.onSelect = this.onSelect.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }

  onAdd (event) {
    event.preventDefault()
    const { history } = this.props
    history.push(routes.invoiceNew())
  }

  onSelect (invoiceId) {
    const { history } = this.props
    history.push(routes.invoice(invoiceId))
  }

  onDelete (invoicesIds) {
    this.setState((prevState) => ({
      invoices: prevState.invoices.filter(
        it => invoicesIds.indexOf(it.id) === -1)
    }))
  }

  render () {
    const { invoices } = this.state

    return (
      <Panel>
        <PanelHeader title='My Invoices'>
          <Button bsStyle='primary' onClick={this.onAdd}>
            New Invoice
          </Button>
        </PanelHeader>
        <InvoiceListTable
          data={invoices}
          onSelect={this.onSelect}
          onDelete={this.onDelete} />
      </Panel>
    )
  }
}

export default withRouter(InvoiceListPage)
