import { default as React, Component } from 'react'
import { Panel } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'

class InvoiceViewPage extends Component {
  render () {
    const { match } = this.props
    return (
      <Panel header='Invoice'>
        Content for Invoice #{match.params.id}
      </Panel>
    )
  }
}

export default withRouter(InvoiceViewPage)
