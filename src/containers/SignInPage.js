import { connect } from 'react-redux'
import { default as React, PropTypes } from 'react'

// components
import { SignInFooter, SignInForm } from '../components'

// redux
import { getSignInFailed } from '../reducers'
import * as actions from '../actions'

const SignInPage = ({ signInFailed, signIn }) => (
  <div>
    <SignInForm onSubmit={signIn} signInFailed={signInFailed} />
    <SignInFooter />
  </div>
)

SignInPage.propTypes = {
  signInFailed: PropTypes.bool.isRequired,
  signIn: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  signInFailed: getSignInFailed(state)
})

export default connect(
  mapStateToProps,
  actions
)(SignInPage)
