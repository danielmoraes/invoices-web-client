import { default as React, Component } from 'react'
import { Button, Panel } from 'react-bootstrap'

import { UserPasswordForm, PanelHeader } from '../components'
import { USER_ID_PARAM } from '../constants'
import * as routes from '../routes'

class UserEditPasswordPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      newPassword: '',
      confirmNewPassword: ''
    }

    this.goBack = this.goBack.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  goBack () {
    const { history, match } = this.props
    const userId = match.params[USER_ID_PARAM]
    history.push(routes.user(userId))
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
        <PanelHeader title='Edit User Password'>
          <Button onClick={this.onCancel}>
            Cancel
          </Button>
          <Button bsStyle='primary' onClick={this.onSave}>
            Save
          </Button>
        </PanelHeader>

        <UserPasswordForm
          data={this.state}
          handleInputChange={this.onChange} />
      </Panel>
    )
  }
}

export default UserEditPasswordPage
