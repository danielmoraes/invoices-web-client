import { default as React, Component } from 'react'
import { Panel, Button } from 'react-bootstrap'

import { UserViewTable, ViewHeader } from '../'

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
    const { history, match } = this.props
    history.push(`${match.url}/edit`)
  }

  render () {
    const { account } = this.state

    return (
      <Panel>

        <ViewHeader title='Account Info'>
          <Button onClick={this.onEdit}>
            Edit
          </Button>
        </ViewHeader>

        <UserViewTable data={account} />

      </Panel>
    )
  }
}

export default AccountViewPage
