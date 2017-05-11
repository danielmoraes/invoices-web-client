import { default as React, Component } from 'react'
import { Button, Panel } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

// components
import { InvoiceForm, PanelHeader } from './'

// app routes
import * as routes from '../routes'

class InvoiceNewPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      description: '',
      date: '',
      number: '',
      beneficiary: '',
      beneficiaryNumber: '',
      amount: ''
    }

    this.goBack = this.goBack.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  goBack () {
    const { history } = this.props
    history.push(routes.invoices())
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
        <PanelHeader title='Invoice Info'>
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

export default withRouter(InvoiceNewPage)
