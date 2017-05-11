import { default as React, Component } from 'react'
import { Button } from 'react-bootstrap'

// components
import { SimpleModal, InvoiceItemForm } from './'

// constants
import { INVOICE_ID_PARAM } from '../constants'

// app routes
import * as routes from '../routes'

class InvoiceItemEditPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      id: 5,
      description: 'Description of the Invoice',
      quantity: 3,
      unitPrice: 1.5
    }

    this.goBack = this.goBack.bind(this)
    this.modalOnHide = this.modalOnHide.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
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
    this.goBack()
  }

  render () {
    return (
      <SimpleModal show onHide={this.modalOnHide}
        title='Edit Invoice Item'
        body={
          <InvoiceItemForm
            data={this.state}
            handleInputChange={this.onChange} />
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

export default InvoiceItemEditPage
