import { connect } from 'react-redux'
import { default as React, Component, PropTypes } from 'react'
import { Button, Panel } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

import { SectionHeader } from 'components'
import { getUsers, getIsFetchingUsers } from 'redux/reducers'
import * as actions from 'redux/actions'
import * as routes from 'routes'

import UserList from './UserList'

class Users extends Component {
  constructor (props) {
    super(props)
    this.onAddClick = this.onAddClick.bind(this)
    this.onItemClick = this.onItemClick.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
  }

  componentWillMount () {
    const { loadUsers } = this.props
    loadUsers()
  }

  onAddClick (event) {
    event.preventDefault()
    const { history } = this.props
    history.push(routes.userNew())
  }

  onItemClick (userId) {
    const { history } = this.props
    history.push(routes.user(userId))
  }

  onDeleteClick (usersIds) {
    const { deleteUser } = this.props
    usersIds.forEach(id => deleteUser(id + ''))
  }

  render () {
    const { users, isFetchingUsers } = this.props

    return (
      <Panel>

        <SectionHeader title='Users'>
          <Button bsStyle='primary' onClick={this.onAddClick}>
            New User
          </Button>
        </SectionHeader>

        { isFetchingUsers && !users.length ? (
          <div>Loading...</div>
        ) : (
          <UserList
            data={users}
            onItemClick={this.onItemClick}
            onDeleteClick={this.onDeleteClick} />
        ) }

      </Panel>
    )
  }
}

Users.propTypes = {
  users: PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
  users: getUsers(state),
  isFetchingUsers: getIsFetchingUsers(state)
})

export default withRouter(connect(mapStateToProps, actions)(Users))
