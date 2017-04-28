import { connect } from 'react-redux'
import { default as React, Component, PropTypes } from 'react'
import { PageHeader } from 'react-bootstrap'
import { Redirect } from 'react-router-dom'

// components
import LoginForm from '../components/LoginForm'

// redux
import { getUser, getLoginFailed } from '../reducers'
import * as actions from '../actions'

// styles
import styles from './LoginPage.css'

class LoginPage extends Component {
  render () {
    const { isAuthenticated, authenticate, loginFailed } = this.props
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    return (
      isAuthenticated ? (
        <Redirect to={from} />
      ) : (
        <div className={styles.loginBox}>
          <PageHeader>Invoices</PageHeader>
          <LoginForm onSubmit={authenticate} loginFailed={loginFailed} />
        </div>
      )
    )
  }
}

LoginPage.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  loginFailed: PropTypes.bool.isRequired,
  authenticate: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: getUser(state).name !== undefined,
    loginFailed: getLoginFailed(state)
  }
}

export default connect(
  mapStateToProps,
  actions
)(LoginPage)
