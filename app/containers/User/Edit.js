import { connect } from 'react-redux'
import { default as React, Component, PropTypes } from 'react'
import { Button, Panel } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

import { SectionHeader } from 'components'
import { USER_ID_PARAM } from 'routes/params'
import { getUser, getAuthUser, getIsFetchingUsers } from 'redux/reducers'
import { User } from 'api/entity-schema'
import { buildEntityFromState, buildStateFromSchema } from 'lib/generator'
import * as actions from 'redux/actions'
import * as routes from 'routes'

import UserEditForm from './UserEditForm'

class Edit extends Component {
  constructor (props) {
    super(props)

    this.state = buildStateFromSchema(User)

    this.updateState = this.updateState.bind(this)
    this.goBack = this.goBack.bind(this)
    this.onCancel = this.onCancel.bind(this)
    this.onChange = this.onChange.bind(this)
    this.onSave = this.onSave.bind(this)
  }

  updateState (user) {
    if (user.id !== this.state.id) {
      this.setState(user)
    }
  }

  componentWillReceiveProps (props) {
    this.updateState(props.user)
  }

  componentWillMount () {
    const { isAccount, user } = this.props

    this.updateState(user)

    if (!isAccount) {
      const { loadUser, match } = this.props
      const userId = match.params[USER_ID_PARAM]
      loadUser(userId).then(user => this.setState(user))
    }
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

    const { mergeUser, user } = this.props
    const updatedUser = buildEntityFromState(this.state, User)
    mergeUser(user.id, updatedUser)

    this.goBack()
  }

  render () {
    const { isAccount } = this.props

    const title = isAccount ? 'Edit Account Info' : 'Edit User Info'

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

        <UserEditForm data={this.state} handleChange={this.onChange} />

      </Panel>
    )
  }
}

Edit.propTypes = {
  user: PropTypes.object.isRequired
}

const mapStateToProps = (state, { match }) => {
  const userId = match.params[USER_ID_PARAM]
  const user = userId ? getUser(state, userId) : getAuthUser(state)
  return {
    user,
    isFetchingUsers: getIsFetchingUsers(state)
  }
}

export default withRouter(connect(mapStateToProps, actions)(Edit))
