import { default as React, Component } from 'react'
import { Button, Panel } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

import { SectionHeader } from 'components'
import { User } from 'api/entity-schema'
import { buildFormStateFromSchema } from 'lib/generator'
import * as routes from 'routes'

import UserNewForm from './UserNewForm'

class New extends Component {
  constructor (props) {
    super(props)

    this.state = buildFormStateFromSchema(User)

    // additional fields
    this.state.confirmPassword = ''

    this.goBack = this.goBack.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  goBack () {
    const { history } = this.props
    history.push(routes.users())
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

        <SectionHeader title={'New User'}>
          <Button onClick={this.onCancel}>
            Cancel
          </Button>
          <Button bsStyle='primary' onClick={this.onSave}>
            Save
          </Button>
        </SectionHeader>

        <UserNewForm data={this.state} handleChange={this.onChange} />

      </Panel>
    )
  }
}

export default withRouter(New)
