import { default as React, Component } from 'react'
import { Panel, Button } from 'react-bootstrap'

import { UserViewTable, PanelHeader } from '../components'
import { USER_ID_PARAM } from '../constants'
import * as routes from '../routes'

const fakeStore = {
  user: {
    id: 5,
    name: 'User #5',
    email: 'user-5@user.com'
  }
}

class UserViewPage extends Component {
  constructor (props) {
    super(props)
    this.state = { user: fakeStore.user }
    this.onEdit = this.onEdit.bind(this)
  }

  onEdit (event) {
    event.preventDefault()
    const { history, match } = this.props
    const userId = match.params[USER_ID_PARAM]
    history.push(routes.userEdit(userId))
  }

  render () {
    const { user } = this.state

    return (
      <Panel>

        <PanelHeader title='User Info'>
          <Button onClick={this.onEdit}>
            Edit
          </Button>
        </PanelHeader>

        <UserViewTable data={user} />

      </Panel>
    )
  }
}

export default UserViewPage
