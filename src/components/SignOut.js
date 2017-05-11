import { connect } from 'react-redux'
import { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signOut } from '../actions'

class SignOut extends Component {
  componentWillMount () {
    const { dispatch, history } = this.props
    history.goBack()
    dispatch(signOut())
  }

  render () {
    return null
  }
}

export default withRouter(connect()(SignOut))
