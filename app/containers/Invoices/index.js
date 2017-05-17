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
        <SectionHeader title='My Invoices'>
          <Button bsStyle='primary' onClick={this.onAddClick}>
            New Invoice
          </Button>
        </SectionHeader>
        { isFetchingInvoices && !data.length ? (
          <div>Loading...</div>
        ) : (
          <InvoiceList
            data={data}
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

export default withRouter(connect(
  mapStateToProps,
  actions
)(Invoices))
