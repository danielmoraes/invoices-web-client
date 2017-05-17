import { default as React, Component } from 'react'
import { Panel, Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

import { SectionHeader } from 'components'
import { USER_ID_PARAM } from 'routes/params'
import * as routes from 'routes'

import UserDetails from './UserDetails'

const fakeStore = {
  user: {
    name: 'User #5',
    email: 'user-5@user.com'
  }
}

class View extends Component {
  constructor (props) {
    super(props)
    this.state = { user: fakeStore.user }
    this.onEditClick = this.onEditClick.bind(this)
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

  render () {
    const { user } = this.state
    const { isAccount, match } = this.props

    let editPasswordRoute
    if (isAccount) {
      editPasswordRoute = routes.accountEditPassword()
    } else {
      editPasswordRoute = routes.userEditPassword(match.params[USER_ID_PARAM])
    }

    return (
      <Panel>

        <SectionHeader title={isAccount ? 'Account Info' : 'User Info'}>
          <Button onClick={this.onEditClick}>
            Edit
          </Button>
        </SectionHeader>

        <UserDetails data={user} editPasswordRoute={editPasswordRoute} />

      </Panel>
    )
  }
}

export default withRouter(View)
