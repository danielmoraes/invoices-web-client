import { default as React, Component } from 'react'
import { Button, Panel } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

import { SectionHeader } from 'components'
import { USER_ID_PARAM } from 'routes/params'
import * as routes from 'routes'

import UserForm from './UserForm'

class EditPage extends Component {
  constructor (props) {
    super(props)

    this.state = { name: '', email: '' }

    this.goBack = this.goBack.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  goBack () {
    const { history, isAccount, isNew } = this.props

    if (isNew) {
      history.push(routes.users())
    } else if (isAccount) {
      history.push(routes.account())
    } else {
      const { match } = this.props
      history.push(routes.user(match.params[USER_ID_PARAM]))
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
    const { isAccount, isNew } = this.props

    let title
    if (isNew) {
      title = 'New User'
    } else if (isAccount) {
      title = 'Edit Account Info'
    } else {
      title = 'Edit User Info'
    }

    return (
      <Panel>
        <SectionHeader title={title}>
          <Button onClick={this.onCancel}>
            Cancel
          </Button>
          <Button bsStyle='primary' onClick={this.onSave}>
            Save
          </Button>
        </SectionHeader>

        <UserForm
          data={this.state}
          handleInputChange={this.onChange}
          isNew={isNew} />
      </Panel>
    )
  }
}

export default withRouter(EditPage)
