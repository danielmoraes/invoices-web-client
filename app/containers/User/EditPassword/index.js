import { default as React, Component } from 'react'
import { Button, Panel } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

import { SectionHeader } from 'components'
import { USER_ID_PARAM } from 'routes/params'
import * as routes from 'routes'

import UserPasswordForm from './UserPasswordForm'

class EditPassword extends Component {
  constructor (props) {
    super(props)
    this.state = { curPassword: '', newPassword: '', confirmNewPassword: '' }
    this.goBack = this.goBack.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  goBack () {
    const { history, isAccount } = this.props

    if (isAccount) {
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
    const { isAccount } = this.props
    return (
      <Panel>
        <SectionHeader
          title={isAccount ? 'Edit Account Password' : 'Edit User Password'}>
          <Button onClick={this.onCancel}>
            Cancel
          </Button>
          <Button bsStyle='primary' onClick={this.onSave}>
            Save
          </Button>
        </SectionHeader>
        <UserPasswordForm
          data={this.state}
          handleInputChange={this.onChange}
          isAccount={isAccount} />
      </Panel>
    )
  }
}

export default withRouter(EditPassword)