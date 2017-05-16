import { connect } from 'react-redux'
import { default as React, Component, PropTypes } from 'react'
import { Button, Panel } from 'react-bootstrap'
import { Route, withRouter } from 'react-router-dom'

import { SectionHeader } from 'components'
import { INVOICE_ID_PARAM } from 'routes/params'
import {
  getInvoice,
  getInvoiceItems,
  getIsFetchingInvoices
} from 'redux/reducers'
import * as actions from 'redux/actions'
import * as routes from 'routes'

import InvoiceDetails from './InvoiceDetails'
import ItemEditModal from './ItemEditModal'
import ItemList from './ItemList'

class InvoicePage extends Component {
  constructor (props) {
    super(props)
    this.onEdit = this.onEdit.bind(this)
    this.onDelete = this.onDelete.bind(this)
    this.onAddItemClick = this.onAddItemClick.bind(this)
    this.onItemClick = this.onItemClick.bind(this)
    this.onDeleteItemsClick = this.onDeleteItemsClick.bind(this)
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
    const { invoice, invoiceItems, isFetchingInvoices } = this.props

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

          { isFetchingInvoices && !invoice.id ? (
            <div>Loading...</div>
          ) : (
            <InvoiceDetails data={invoice} />
          ) }

        </Panel>

        { invoice.type === 2 && (
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
              data={invoiceItems}
              onItemClick={this.onItemClick}
              onDeleteClick={this.onDeleteItemsClick} />

          </Panel>
        )}

      </div>
    )
  }
}

InvoicePage.propTypes = {
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
)(InvoicePage))
