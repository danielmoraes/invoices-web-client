import { default as React, Component } from 'react'
import { withRouter } from 'react-router-dom'
import { Button } from 'react-bootstrap'

import { InvoiceItemForm, SimpleModal } from '../components'
import { INVOICE_ID_PARAM } from '../constants'
import * as routes from '../routes'

class InvoiceItemNewPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      description: '',
      quantity: 0,
      unitPrice: 0
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
        title='New Invoice Item'
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

export default withRouter(InvoiceItemNewPage)
