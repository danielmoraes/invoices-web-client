import { connect } from 'react-redux'
import { default as React, Component, PropTypes } from 'react'
import { Button, Panel } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

import { SectionHeader } from 'components'
import { USER_ID_PARAM } from 'routes/params'
import { getUser, getAuthUser } from 'redux/reducers'
import { updateUserPassword } from 'redux/actions'
import * as routes from 'routes'

import AccountEditPasswordForm from './AccountEditPasswordForm'
import UserEditPasswordForm from './UserEditPasswordForm'

class EditPassword extends Component {
  constructor (props) {
    super(props)

    this.state = {
      newPassword: '',
      confirmNewPassword: ''
    }

    if (props.isAccount) {
      this.state.currentPassword = ''
    }

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

    const { dispatch, isAccount, user } = this.props
    const { newPassword } = this.state

    if (isAccount) {
      const { currentPassword } = this.state
      dispatch(updateUserPassword(user.id, newPassword, currentPassword))
    } else {
      dispatch(updateUserPassword(user.id, newPassword))
    }

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

        { isAccount ? (
          <AccountEditPasswordForm
            data={this.state}
            handleChange={this.onChange}
            onSubmit={this.onSave} />
        ) : (
          <UserEditPasswordForm
            data={this.state}
            handleChange={this.onChange}
            onSubmit={this.onSave} />
        ) }

      </Panel>
    )
  }
}

EditPassword.propTypes = {
  user: PropTypes.object.isRequired
}

const mapStateToProps = (state, { match }) => {
  const userId = match.params[USER_ID_PARAM]
  const user = userId ? getUser(state, userId) : getAuthUser(state)
  return { user }
}

export default withRouter(connect(mapStateToProps)(EditPassword))
