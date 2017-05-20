import { connect } from 'react-redux'
import { default as React, Component, PropTypes } from 'react'
import { Button, Panel } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

import { SectionHeader } from 'components'
import { getInvoices, getIsFetchingInvoices } from 'redux/reducers'
import * as actions from 'redux/actions'
import * as routes from 'routes'

import InvoiceList from './InvoiceList'

class Invoices extends Component {
  constructor (props) {
    super(props)
    this.onAddClick = this.onAddClick.bind(this)
    this.onItemClick = this.onItemClick.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  componentWillMount () {
    const { loadInvoices } = this.props
    loadInvoices()
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
    const { deleteInvoice } = this.props
    invoicesIds.forEach(id => deleteInvoice(id + ''))
  }

  render () {
    const { invoices, isFetchingInvoices } = this.props

    return (
      <Panel>

        <SectionHeader title='My Invoices'>
          <Button bsStyle='primary' onClick={this.onAddClick}>
            New Invoice
          </Button>
        </SectionHeader>

        { isFetchingInvoices && !invoices.length ? (
          <div>Loading...</div>
        ) : (
          <InvoiceList
            data={invoices}
            onItemClick={this.onItemClick}
            onDeleteClick={this.onDeleteClick} />
        ) }

      </Panel>
    )
  }
}

Invoices.propTypes = {
  invoices: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  invoices: getInvoices(state),
  isFetchingInvoices: getIsFetchingInvoices(state)
})

export default withRouter(connect(mapStateToProps, actions)(Invoices))
