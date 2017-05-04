import { connect } from 'react-redux'
import { default as React, Component, PropTypes } from 'react'
import { PageHeader } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

// components
import SignInForm from '../components/SignInForm'

// redux
import { getUser, getSignInFailed } from '../reducers'
import * as actions from '../actions'

// styles
import styles from './SignInPage.css'

class SignInPage extends Component {
  render () {
    const { isAuthenticated, signIn, signInFailed } = this.props
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    return (
      isAuthenticated ? (
        <Redirect to={from} />
      ) : (
        <div className={styles.signInBox}>
          <PageHeader>Invoices</PageHeader>
          <SignInForm onSubmit={signIn} signInFailed={signInFailed} />
        </div>
      )
    )
  }
}

SignInPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  signInFailed: PropTypes.bool.isRequired,
  signIn: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: getUser(state).name !== undefined,
    signInFailed: getSignInFailed(state)
  }
}

export default connect(
  mapStateToProps,
  actions
)(SignInPage)
