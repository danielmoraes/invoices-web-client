import { connect } from 'react-redux'
import { default as React, Component, PropTypes } from 'react'
import { Panel, Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

import { SectionHeader } from 'components'
import { USER_ID_PARAM } from 'routes/params'
import { getUser, getAuthUser, getIsFetchingUsers } from 'redux/reducers'
import * as actions from 'redux/actions'
import * as routes from 'routes'

import UserDetails from './UserDetails'

class View extends Component {
  constructor (props) {
    super(props)
    this.onEditClick = this.onEditClick.bind(this)
  }

  componentWillMount () {
    const { isAccount } = this.props
    if (!isAccount) {
      const { loadUser, match } = this.props
      const userId = match.params[USER_ID_PARAM]
      loadUser(userId)
    }
  }

  onEditClick (event) {
    event.preventDefault()
    const { history, isAccount } = this.props

    if (isAccount) {
      history.push(routes.accountEdit())
    } else {
      const { match } = this.props
      history.push(routes.userEdit(match.params[USER_ID_PARAM]))
    }
  }

  onDeleteClick (event) {
    // TODO
  }

  render () {
    const { user, isFetchingUsers, isAccount } = this.props

    const sectionTitle = isAccount ? 'Account Info' : 'User Info'

    let editPasswordRoute = null

    if (isAccount) {
      editPasswordRoute = routes.accountEditPassword()
    } else {
      const { match } = this.props
      editPasswordRoute = routes.userEditPassword(match.params[USER_ID_PARAM])
    }

    return (
      <Panel>

        <SectionHeader title={sectionTitle}>
          <Button onClick={this.onEditClick}>
            Edit
          </Button>
          { !isAccount && (
            <Button bsStyle='danger' onClick={this.onDeleteClick}>
              Delete
            </Button>
          ) }
        </SectionHeader>

        { isFetchingUsers && !user.id ? (
          <div>Loading...</div>
        ) : (
          <UserDetails data={user} editPasswordRoute={editPasswordRoute} />
        ) }

      </Panel>
    )
  }
}

View.propTypes = {
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

export default withRouter(connect(mapStateToProps, actions)(View))
