import { default as React, Component } from 'react'
import { Button, Panel } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

import { SectionHeader } from 'components'
import { INVOICE_ID_PARAM } from 'routes/params'
import * as routes from 'routes'

import InvoiceForm from './InvoiceForm'

class EditPage extends Component {
  constructor (props) {
    super(props)

    this.state = props.isNew ? {
      description: '',
      date: '',
      number: '',
      beneficiary: '',
      beneficiaryNumber: '',
      amount: ''
    } : {
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
    const { history, isNew } = this.props

    if (isNew) {
      history.push(routes.invoices())
    } else {
      const { match } = this.props
      history.push(routes.invoice(match.params[INVOICE_ID_PARAM]))
    }
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
    const { isNew } = this.props
    return (
      <Panel>
        <SectionHeader title={isNew ? 'New Invoice' : 'Edit Invoice Info'}>
          <Button onClick={this.onCancel}>
            Cancel
          </Button>
          <Button bsStyle='primary' onClick={this.onSave}>
            Save
          </Button>
        </SectionHeader>

        <InvoiceForm data={this.state} handleInputChange={this.onChange} />
      </Panel>
    )
  }
}

export default withRouter(EditPage)
