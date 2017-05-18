import { default as React, Component } from 'react'
import { Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

import { Modal } from 'components'
import { InvoiceItem } from 'api/entity-schema'
import { buildFormStateFromSchema } from 'lib/generator'
import { INVOICE_ID_PARAM } from 'routes/params'
import * as routes from 'routes'

import ItemForm from './InvoiceItemForm'

class New extends Component {
  constructor (props) {
    super(props)

    this.state = buildFormStateFromSchema(InvoiceItem)

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
      <Modal show onHide={this.modalOnHide} title='New Invoice Item'
        body={
          <ItemForm data={this.state} handleChange={this.onChange} />
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

export default withRouter(New)
