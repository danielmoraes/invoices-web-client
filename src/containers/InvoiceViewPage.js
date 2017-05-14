import { connect } from 'react-redux'
import { default as React, Component, PropTypes } from 'react'
import { Button, Panel } from 'react-bootstrap'
import { Route, withRouter } from 'react-router-dom'

import {
  PanelHeader,
  InvoiceViewTable,
  InvoiceItemEditPage,
  InvoiceItemListTable,
  InvoiceItemNewPage
} from '../components'
import { INVOICE_ID_PARAM } from '../constants'
import { getInvoice, getInvoiceItems, getIsFetchingInvoices } from '../reducers'
import * as actions from '../actions'
import * as routes from '../routes'

class InvoiceViewPage extends Component {
  constructor (props) {
    super(props)
    this.onEdit = this.onEdit.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.onAddItem = this.onAddItem.bind(this)
    this.onSelectItem = this.onSelectItem.bind(this)
    this.onDeleteItem = this.onDeleteItem.bind(this)
  }

  componentWillMount () {
    const { loadInvoice, match } = this.props
    const invoiceId = match.params[INVOICE_ID_PARAM]
    loadInvoice(invoiceId)
  }

  onEdit (event) {
    event.preventDefault()
    const { history, match } = this.props
    const invoiceId = match.params[INVOICE_ID_PARAM]
    history.push(routes.invoiceEdit(invoiceId))
  }

  onDelete (event) {
    event.preventDefault()
    const { deleteInvoice, history, match } = this.props
    const invoiceId = match.params[INVOICE_ID_PARAM]
    deleteInvoice(invoiceId)
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
    const { invoice, invoiceItems, isFetchingInvoices } = this.props

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

          { isFetchingInvoices && !invoice.id ? (
            <div>Loading...</div>
          ) : (
            <InvoiceViewTable data={invoice} />
          ) }

        </Panel>

        { invoice.type === 2 && (
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
              data={invoiceItems}
              onSelect={this.onSelectItem}
              onDelete={this.onDeleteItem} />

          </Panel>
        )}
      </div>
    )
  }
}

InvoiceViewPage.propTypes = {
  invoice: PropTypes.object.isRequired
}

const mapStateToProps = (state, { match }) => ({
  invoice: getInvoice(state, match.params[INVOICE_ID_PARAM]),
  invoiceItems: getInvoiceItems(state, match.params[INVOICE_ID_PARAM]),
  isFetchingInvoices: getIsFetchingInvoices(state)
})

export default withRouter(connect(
  mapStateToProps,
  actions
)(InvoiceViewPage))
