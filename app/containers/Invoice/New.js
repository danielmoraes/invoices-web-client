import { connect } from 'react-redux'
import { default as React, Component } from 'react'
import { Button, Panel } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

import { SectionHeader } from 'components'
import { Invoice } from 'api/entity-schema'
import { InvoiceType } from 'api/enums'
import { buildEntityFromState, buildStateFromSchema } from 'lib/generator'
import { createInvoice } from 'redux/actions'
import * as routes from 'routes'

import InvoiceForm from './InvoiceForm'

class New extends Component {
  constructor (props) {
    super(props)

    this.state = buildStateFromSchema(Invoice)

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

    const { dispatch } = this.props

    let invoice = buildEntityFromState(this.state, Invoice)
    if (invoice.type === InvoiceType.DETAILED) {
      delete invoice.amount
    }
    dispatch(createInvoice(invoice))

    this.goBack()
  }

  render () {
    return (
      <Panel>

        <SectionHeader title={'New Invoice'}>
          <Button onClick={this.onCancel}>
            Cancel
          </Button>
          <Button bsStyle='primary' onClick={this.onSave}>
            Save
          </Button>
        </SectionHeader>

        <InvoiceForm data={this.state} handleChange={this.onChange} />

      </Panel>
    )
  }
}

export default withRouter(connect()(New))
