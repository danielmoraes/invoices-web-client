import { default as React, Component } from 'react'
import { Panel, Button } from 'react-bootstrap'

import { UserViewTable, PanelHeader } from '../components'
import * as routes from '../routes'

const fakeStore = {
  account: {
    id: 5,
    name: 'Admin',
    email: 'admin@admin.com'
  }
}

class AccountViewPage extends Component {
  constructor (props) {
    super(props)
    this.state = { account: fakeStore.account }
    this.onEdit = this.onEdit.bind(this)
  }

  onEdit (event) {
    event.preventDefault()
    const { history } = this.props
    history.push(routes.accountEdit())
  }

  render () {
    const { account } = this.state

    return (
      <Panel>

        <PanelHeader title='Account Info'>
          <Button onClick={this.onEdit}>
            Edit
          </Button>
        </PanelHeader>

        <UserViewTable data={account} />

      </Panel>
    )
  }
}

export default AccountViewPage
