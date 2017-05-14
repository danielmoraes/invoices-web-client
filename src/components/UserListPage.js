import { default as React, Component } from 'react'
import { Button, Panel } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

import { UserListTable, PanelHeader } from '../components'
import * as routes from '../routes'

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

class UserListPage extends Component {
  constructor (props) {
    super(props)
    this.state = { users: fakeStore.users }
    this.onAdd = this.onAdd.bind(this)
    this.onSelect = this.onSelect.bind(this)
    this.onDelete = this.onDelete.bind(this)
  }

  onAdd (event) {
    event.preventDefault()
    const { history } = this.props
    history.push(routes.userNew())
  }

  onSelect (userId) {
    const { history } = this.props
    history.push(routes.user(userId))
  }

  onDelete (usersIds) {
    this.setState((prevState) => ({
      users: prevState.users.filter(
        it => usersIds.indexOf(it.id) === -1)
    }))
  }

  render () {
    const { users } = this.state

    return (
      <Panel>
        <PanelHeader title='Users'>
          <Button bsStyle='primary' onClick={this.onAdd}>
            New User
          </Button>
        </PanelHeader>
        <UserListTable
          data={users}
          onSelect={this.onSelect}
          onDelete={this.onDelete} />
      </Panel>
    )
  }
}

export default withRouter(UserListPage)
