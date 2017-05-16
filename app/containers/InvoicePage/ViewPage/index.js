import { default as React, Component } from 'react'
import { Button, Panel } from 'react-bootstrap'
import { Route, withRouter } from 'react-router-dom'

import { SectionHeader } from 'components'
import { INVOICE_ID_PARAM } from 'routes/params'
import * as routes from 'routes'

import InvoiceDetails from './InvoiceDetails'
import ItemEditModal from './ItemEditModal'
import ItemList from './ItemList'

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
    this.onAddItemClick = this.onAddItemClick.bind(this)
    this.onItemClick = this.onItemClick.bind(this)
    this.onDeleteItemsClick = this.onDeleteItemsClick.bind(this)
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

  onAddItemClick (event) {
    event.preventDefault()
    const { history, match } = this.props
    const invoiceId = match.params[INVOICE_ID_PARAM]
    history.push(routes.invoiceItemNew(invoiceId))
  }

  onItemClick (itemId) {
    const { history, match } = this.props
    const invoiceId = match.params[INVOICE_ID_PARAM]
    history.push(routes.invoiceItemEdit(invoiceId, itemId))
  }

  onDeleteItemsClick (itemsIds) {
    this.setState((prevState) => ({
      items: prevState.items.filter(it => itemsIds.indexOf(it.id) === -1)
    }))
  }

  render () {
    const { invoice, items } = this.state

    return (
      <div>
        <Panel>

          <SectionHeader title='Invoice Info'>
            <Button onClick={this.onEdit}>
              Edit
            </Button>
            <Button bsStyle='danger' onClick={this.onDelete}>
              Delete
            </Button>
          </SectionHeader>

          <InvoiceDetails data={invoice} />

        </Panel>

        <Panel>

          <Route path={routes.invoiceItemNew()} render={() => (
            <ItemEditModal isNew />
          )} />

          <Route path={routes.invoiceItemEdit()} render={() => (
            <ItemEditModal />
          )} />

          <SectionHeader title='Invoice Items'>
            <Button bsStyle='primary' onClick={this.onAddItemClick}>
              New Item
            </Button>
          </SectionHeader>

          <ItemList
            data={items}
            onItemClick={this.onItemClick}
            onDeleteClick={this.onDeleteItemsClick} />

        </Panel>
      </div>
    )
  }
}

export default withRouter(InvoiceViewPage)
