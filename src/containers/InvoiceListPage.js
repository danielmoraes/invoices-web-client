import { connect } from 'react-redux'
import { default as React, Component, PropTypes } from 'react'
import { Button, Panel } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

import { InvoiceListTable, PanelHeader } from '../components'
import { getInvoices, getIsFetchingInvoices } from '../reducers'
import * as actions from '../actions'
import * as routes from '../routes'

class InvoiceListPage extends Component {
  constructor (props) {
    super(props)
    this.onAdd = this.onAdd.bind(this)
    this.onSelect = this.onSelect.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }

  componentWillMount () {
    const { loadInvoices } = this.props
    loadInvoices()
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
    const { invoices, isFetchingInvoices } = this.props

    const data = invoices.map((invoice) => {
      invoice.beneficiary =
        `${invoice.beneficiaryName} (${invoice.beneficiaryNumber})`
      return invoice
    })

    return (
      <Panel>
        <PanelHeader title='My Invoices'>
          <Button bsStyle='primary' onClick={this.onAdd}>
            New Invoice
          </Button>
        </PanelHeader>
        { isFetchingInvoices && !data.length ? (
          <div>Loading...</div>
        ) : (
          <InvoiceListTable
            data={data}
            onSelect={this.onSelect}
            onDelete={this.onDelete} />
        ) }
      </Panel>
    )
  }
}

InvoiceListPage.propTypes = {
  invoices: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  invoices: getInvoices(state),
  isFetchingInvoices: getIsFetchingInvoices(state)
})

export default withRouter(connect(
  mapStateToProps,
  actions
)(InvoiceListPage))
