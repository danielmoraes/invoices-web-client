import { connect } from 'react-redux'
import { default as React, Component, PropTypes } from 'react'
import { Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

import { Modal } from 'components'
import { INVOICE_ID_PARAM, INVOICE_ITEM_ID_PARAM } from 'routes/params'
import { InvoiceItem } from 'api/entity-schema'
import { buildEntityFromState, buildStateFromSchema } from 'lib/generator'
import { getInvoiceItem, getIsFetchingInvoices } from 'redux/reducers'
import * as actions from 'redux/actions'
import * as routes from 'routes'

import InvoiceItemForm from './InvoiceItemForm'

class Edit extends Component {
  constructor (props) {
    super(props)

    this.state = buildStateFromSchema(InvoiceItem)

    this.updateState = this.updateState.bind(this)
    this.goBack = this.goBack.bind(this)
    this.modalOnHide = this.modalOnHide.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  updateState (invoiceItem) {
    if (invoiceItem.id !== this.state.id) {
      this.setState(invoiceItem)
    }
  }

  componentWillMount () {
    const { invoiceItem } = this.props
    this.updateState(invoiceItem)
  }

  componentWillReceiveProps (props) {
    this.updateState(props.invoiceItem)
  }

  goBack () {
    const { history, match } = this.props
    const invoiceId = match.params[INVOICE_ID_PARAM]
    history.push(routes.invoice(invoiceId))
  }

  modalOnHide () {
    this.goBack()
  }

  onCancel (event) {
    event.preventDefault()
    this.goBack()
  }

  onChange (event) {
    const target = event.target
    this.setState({ [target.name]: target.value })
  }

  onSave (event) {
    event.preventDefault()

    const { updateInvoiceItem, match } = this.props

    const invoiceId = match.params[INVOICE_ID_PARAM]
    const invoiceItemId = match.params[INVOICE_ITEM_ID_PARAM]
    let invoiceItem = buildEntityFromState(this.state, InvoiceItem)
    updateInvoiceItem(invoiceId, invoiceItemId, invoiceItem)

    this.goBack()
  }

  render () {
    const { isFetchingInvoices } = this.props

    return (
      <Modal show onHide={this.modalOnHide} title='Edit Invoice Item'
        body={
          isFetchingInvoices && !this.state.id ? (
            <div>Loading...</div>
          ) : (
            <InvoiceItemForm data={this.state} handleChange={this.onChange} />
          )
        }
        footer={
          <div>
            <Button onClick={this.onCancel}>Cancel</Button>
            <Button bsStyle='primary' onClick={this.onSave}>Save</Button>
          </div>
        }
      />
    )
  }
}

Edit.propTypes = {
  invoiceItem: PropTypes.object.isRequired
}

const mapStateToProps = (state, { match }) => ({
  invoiceItem: getInvoiceItem(state, match.params[INVOICE_ITEM_ID_PARAM]),
  isFetchingInvoices: getIsFetchingInvoices(state)
})

export default withRouter(connect(mapStateToProps, actions)(Edit))
