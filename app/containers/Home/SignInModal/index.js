import { connect } from 'react-redux'
import { default as React, Component, PropTypes } from 'react'
import { withRouter } from 'react-router-dom'

import { Modal } from 'components'
import { getSignInFailed } from 'redux/reducers'
import { home } from 'routes'
import * as actions from 'redux/actions'

import Footer from './Footer'
import SignInForm from './SignInForm'

class SignInModal extends Component {
  constructor (props) {
    super(props)
    this.goBack = this.goBack.bind(this)
    this.modalOnHide = this.modalOnHide.bind(this)
  }

  goBack () {
    const { history } = this.props
    history.push(home())
  }

  modalOnHide () {
    const { signInCancel } = this.props
    signInCancel()
    this.goBack()
  }

  render () {
    const { signInFailed, signIn } = this.props
    return (
      <Modal show onHide={this.modalOnHide} title='Sign In' bsSize='sm'
        body={
          <SignInForm onSubmit={signIn} signInFailed={signInFailed} />
        }
        footer={
          <Footer />
        }
      />
    )
  }
}

SignInModal.propTypes = {
  location: PropTypes.object.isRequired,
  signInFailed: PropTypes.bool.isRequired,
  signIn: PropTypes.func.isRequired,
  signInCancel: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  signInFailed: getSignInFailed(state)
})

export default withRouter(connect(
  mapStateToProps,
  actions
)(SignInModal))
