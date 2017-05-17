import { Button, Panel } from 'react-bootstrap'
import { default as React, Component } from 'react'
import { withRouter } from 'react-router-dom'

import { SectionHeader } from 'components'
import * as routes from 'routes'

import UserList from './UserList'

const fakeStore = {
  users: []
}

function addUsers (quantity) {
  const startId = fakeStore.users.length
  for (let i = quantity - 1; i >= 0; i--) {
    const id = startId + i
    fakeStore.users.push({
      id: id,
      name: `User #${id}`,
      email: `user-${id}@user.com`
    })
  }
}

addUsers(10)

class Users extends Component {
  constructor (props) {
    super(props)
    this.state = { users: fakeStore.users }
    this.onAddClick = this.onAddClick.bind(this)
    this.onItemClick = this.onItemClick.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
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
    this.setState((prevState) => ({
      users: prevState.users.filter(
        it => usersIds.indexOf(it.id) === -1)
    }))
  }

  render () {
    const { users } = this.state

    return (
      <Panel>

        <SectionHeader title='Users'>
          <Button bsStyle='primary' onClick={this.onAddClick}>
            New User
          </Button>
        </SectionHeader>

        <UserList
          data={users}
          onItemClick={this.onItemClick}
          onDeleteClick={this.onDeleteClick} />

      </Panel>
    )
  }
}

export default withRouter(Users)
