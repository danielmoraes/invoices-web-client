import { Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { default as React, PropTypes } from 'react'
import { LinkContainer } from 'react-router-bootstrap'

// components
import { SignInForm } from '../components'

// redux
import { getSignInFailed } from '../reducers'
import * as actions from '../actions'

const SignInPage = ({ signInFailed, signIn }) => (
  <div>
    <SignInForm onSubmit={signIn} signInFailed={signInFailed} />

    <div className='text-center'>
      <LinkContainer to='/forgot-password'>
        <Button bsStyle='link'>Forgot your password?</Button>
      </LinkContainer>
    </div>

    <div className='text-center'>
      Don't have an account?
      <LinkContainer to='/signup'>
        <Button bsStyle='link'>Sign up!</Button>
      </LinkContainer>
    </div>
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
