import { default as React, Component } from 'react'
import { Button, Panel } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

// components
import { InvoiceForm, ViewHeader } from '../'

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
    console.log('new invoice', this.state)
    this.backToParent()
  }

  render () {
    return (
      <Panel>
        <ViewHeader title='Invoice Info'>
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

export default withRouter(InvoiceNewPage)
