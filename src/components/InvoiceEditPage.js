import { default as React, Component } from 'react'
import { Button, Panel } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

import { InvoiceForm, PanelHeader } from '../components'
import { INVOICE_ID_PARAM } from '../constants'
import * as routes from '../routes'

class InvoiceEditPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      id: 5,
      description: 'Description of the Invoice',
      date: '2017-01-01',
      number: '1234567890',
      beneficiary: 'Company Name',
      beneficiaryNumber: '123.456.789.0',
      amount: '10'
    }

    this.goBack = this.goBack.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
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
    return (
      <Panel>
        <PanelHeader title='Edit Invoice Info'>
          <Button onClick={this.onCancel}>
            Cancel
          </Button>
          <Button bsStyle='primary' onClick={this.onSave}>
            Save
          </Button>
        </PanelHeader>

        <InvoiceForm data={this.state} handleInputChange={this.onChange} />
      </Panel>
    )
  }
}

export default withRouter(InvoiceEditPage)
