import { default as React, Component } from 'react'
import { Button, Panel } from 'react-bootstrap'
import { Route, withRouter } from 'react-router-dom'

// components
import {
  PanelHeader,
  InvoiceViewTable,
  InvoiceItemEditPage,
  InvoiceItemListTable,
  InvoiceItemNewPage
} from './'

// constants
import { INVOICE_ID_PARAM } from '../constants'

// app routes
import * as routes from '../routes'

const fakeStore = {
  invoice: {
    id: '5',
    description: 'Description of the Invoice',
    date: '01/01/2017',
    number: '1234567890',
    beneficiary: 'Company Name',
    beneficiaryNumber: '123.456.789.0',
    amount: '$ 10'
  },
  items: []
}

function addItems (quantity) {
  const startId = fakeStore.items.length
  for (let i = 0; i < quantity; i++) {
    const id = startId + i
    fakeStore.items.push({
      id: id,
      description: 'Description of the InvoiceItem #' + id,
      quantity: 3,
      unitPrice: 1.5,
      amount: 5 + i
    })
  }
}

addItems(5)

class InvoiceViewPage extends Component {
  constructor (props) {
    super(props)
    this.state = { invoice: fakeStore.invoice, items: fakeStore.items }
    this.onEdit = this.onEdit.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.onAddItem = this.onAddItem.bind(this)
    this.onSelectItem = this.onSelectItem.bind(this)
    this.onDeleteItem = this.onDeleteItem.bind(this)
  }

  onEdit (event) {
    event.preventDefault()
    const { history, match } = this.props
    const invoiceId = match.params[INVOICE_ID_PARAM]
    history.push(routes.invoiceEdit(invoiceId))
  }

  onDelete (event) {
    event.preventDefault()
    const { history } = this.props
    history.push(routes.invoices())
  }

  onAddItem (event) {
    event.preventDefault()
    const { history, match } = this.props
    const invoiceId = match.params[INVOICE_ID_PARAM]
    history.push(routes.invoiceItemNew(invoiceId))
  }

  onSelectItem (itemId) {
    const { history, match } = this.props
    const invoiceId = match.params[INVOICE_ID_PARAM]
    history.push(routes.invoiceItemEdit(invoiceId, itemId))
  }

  onDeleteItem (itemsIds) {
    this.setState((prevState) => ({
      items: prevState.items.filter(it => itemsIds.indexOf(it.id) === -1)
    }))
  }

  render () {
    const { invoice, items } = this.state

    return (
      <div>
        <Panel>

          <PanelHeader title='Invoice Info'>
            <Button onClick={this.onEdit}>
              Edit
            </Button>
            <Button bsStyle='danger' onClick={this.onDelete}>
              Delete
            </Button>
          </PanelHeader>

          <InvoiceViewTable data={invoice} />

        </Panel>

        <Panel>

          <Route path={routes.invoiceItemNew()}
            component={InvoiceItemNewPage} />

          <Route path={routes.invoiceItemEdit()}
            component={InvoiceItemEditPage} />

          <PanelHeader title='Invoice Items'>
            <Button bsStyle='primary' onClick={this.onAddItem}>
              New Item
            </Button>
          </PanelHeader>

          <InvoiceItemListTable
            data={items}
            onSelect={this.onSelectItem}
            onDelete={this.onDeleteItem} />

        </Panel>
      </div>
    )
  }
}

export default withRouter(InvoiceViewPage)
