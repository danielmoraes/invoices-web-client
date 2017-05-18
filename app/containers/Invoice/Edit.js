import { connect } from 'react-redux'
import { default as React, Component, PropTypes } from 'react'
import { Button, Panel } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

import { SectionHeader } from 'components'
import { INVOICE_ID_PARAM } from 'routes/params'
import { getInvoice, getIsFetchingInvoices } from 'redux/reducers'
import { Invoice } from 'api/entity-schema'
import { buildFormStateFromSchema } from 'lib/generator'
import * as actions from 'redux/actions'
import * as routes from 'routes'

import InvoiceForm from './InvoiceForm'

class Edit extends Component {
  constructor (props) {
    super(props)

    this.state = buildFormStateFromSchema(Invoice)

    this.updateState = this.updateState.bind(this)
    this.goBack = this.goBack.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  updateState (invoice) {
    if (invoice.id !== this.state.id) {
      this.setState(invoice)
    }
  }

  componentWillReceiveProps (props) {
    this.updateState(props.invoice)
  }

  componentWillMount () {
    const { loadInvoice, match, invoice } = this.props

    this.updateState(invoice)

    const invoiceId = match.params[INVOICE_ID_PARAM]
    loadInvoice(invoiceId).then(invoice => this.setState(invoice))
  }

  goBack () {
    const { history, match } = this.props
    const invoiceId = match.params[INVOICE_ID_PARAM]
    history.push(routes.invoice(invoiceId))
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
    this.goBack()
  }

  render () {
    const { isFetchingInvoices } = this.props

    return (
      <Panel>
        <SectionHeader title={'Edit Invoice Info'}>
          <Button onClick={this.onCancel}>
            Cancel
          </Button>
          <Button bsStyle='primary' onClick={this.onSave}>
            Save
          </Button>
        </SectionHeader>

        { isFetchingInvoices && !this.state.id ? (
          <div>Loading...</div>
        ) : (
          <InvoiceForm data={this.state} handleChange={this.onChange} />
        ) }

      </Panel>
    )
  }
}

Edit.propTypes = {
  invoice: PropTypes.object.isRequired
}

const mapStateToProps = (state, { match }) => ({
  invoice: getInvoice(state, match.params[INVOICE_ID_PARAM]),
  isFetchingInvoices: getIsFetchingInvoices(state)
})

export default withRouter(connect(mapStateToProps, actions)(Edit))
