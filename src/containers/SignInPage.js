import { connect } from 'react-redux'
import { default as React, Component, PropTypes } from 'react'
import { withRouter } from 'react-router-dom'

// components
import { SimpleModal, SignInFooter, SignInForm } from '../components'

// redux
import { getSignInFailed } from '../reducers'
import * as actions from '../actions'

// app routes
import * as routes from '../routes'

class SignInPage extends Component {
  constructor (props) {
    super(props)
    this.goBack = this.goBack.bind(this)
    this.modalOnHide = this.modalOnHide.bind(this)
  }

  goBack () {
    const { history } = this.props
    history.push(routes.home())
  }

  modalOnHide () {
    const { signInCancel } = this.props
    signInCancel()
    this.goBack()
  }

  render () {
    const { signInFailed, signIn } = this.props
    return (
      <SimpleModal show onHide={this.modalOnHide} title='Sign In' bsSize='sm'
        body={
          <SignInForm onSubmit={signIn} signInFailed={signInFailed} />
        }
        footer={
          <SignInFooter />
        }
      />
    )
  }
}

SignInPage.propTypes = {
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
)(SignInPage))
