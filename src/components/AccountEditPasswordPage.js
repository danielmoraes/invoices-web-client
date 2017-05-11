import { default as React, Component } from 'react'
import { Button, Panel } from 'react-bootstrap'

// components
import { AccountPasswordForm, PanelHeader } from './'

// app routes
import * as routes from '../routes'

class AccountEditPasswordPage extends Component {
  constructor (props) {
    super(props)

    this.state = {
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: ''
    }

    this.goBack = this.goBack.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  goBack () {
    const { history } = this.props
    history.push(routes.account())
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
        <PanelHeader title='Edit Account Password'>
          <Button onClick={this.onCancel}>
            Cancel
          </Button>
          <Button bsStyle='primary' onClick={this.onSave}>
            Save
          </Button>
        </PanelHeader>

        <AccountPasswordForm
          data={this.state}
          handleInputChange={this.onChange} />
      </Panel>
    )
  }
}

export default AccountEditPasswordPage
