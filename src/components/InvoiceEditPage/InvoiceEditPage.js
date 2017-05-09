import { default as React, Component } from 'react'
import { Button, Panel } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

// components
import { InvoiceForm, ViewHeader } from '../'

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

    this.backToParent = this.backToParent.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  backToParent () {
    const { history, location } = this.props
    const currentPath = location.pathname
    const parentPath = currentPath.substring(0, currentPath.lastIndexOf('/'))
    history.push(parentPath)
  }

  onCancel (event) {
    event.preventDefault()
    this.backToParent()
  }

  onChange (event) {
    const target = event.target
    this.setState({ [target.name]: target.value })
  }

  onSave (event) {
    event.preventDefault()
    console.log('edit invoice', this.state)
    this.backToParent()
  }

  render () {
    return (
      <Panel>
        <ViewHeader title='Edit Invoice Info'>
          <Button onClick={this.onCancel}>
            Cancel
          </Button>
          <Button bsStyle='primary' onClick={this.onSave}>
            Save
          </Button>
        </ViewHeader>

        <InvoiceForm data={this.state} handleInputChange={this.onChange} />
      </Panel>
    )
  }
}

export default withRouter(InvoiceEditPage)
