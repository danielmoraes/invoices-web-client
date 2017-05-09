import { default as React, Component } from 'react'
import { Button, Panel } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

// components
import { InvoiceListTable, ViewHeader } from '../'

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
    const { history, match } = this.props
    history.push(`${match.url}/new`)
  }

  onSelect (id) {
    const { history, match } = this.props
    history.push(`${match.url}/${id}`)
  }

  onDelete (ids) {
    this.setState((prevState) => ({
      invoices: prevState.invoices.filter(it => ids.indexOf(it.id) === -1)
    }))
  }

  render () {
    const { invoices } = this.state

    return (
      <Panel>
        <ViewHeader title='My Invoices'>
          <Button bsStyle='primary' onClick={this.onAdd}>
            New Invoice
          </Button>
        </ViewHeader>
        <InvoiceListTable
          data={invoices}
          onSelect={this.onSelect}
          onDelete={this.onDelete} />
      </Panel>
    )
  }
}

export default withRouter(InvoiceListPage)
