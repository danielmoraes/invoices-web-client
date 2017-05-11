import { connect } from 'react-redux'
import { default as React, PropTypes } from 'react'
import { withRouter, Redirect, Route, Switch } from 'react-router-dom'

// components
import { HomePage, NotFoundPage } from '../components'

// redux
import { getIsAuthenticated, getIsSigningOut } from '../reducers'
import * as actions from '../actions'

// app routes
import * as routes from '../routes'

const PublicApp = ({ isAuthenticated, isSigningOut, location }) => {
  const { from } = location.state || { from: { pathname: '/app' } }
  return (
    isAuthenticated && !isSigningOut ? (
      <Redirect to={from} />
    ) : (
      <Switch>

        <Route exact path={routes.home()} component={HomePage} />

        <Route path={routes.signIn()} component={HomePage} />

        <Route path={routes.signUp()} component={HomePage} />

        <Route path={routes.forgotPassword()} component={HomePage} />

        <Route component={NotFoundPage} />

      </Switch>
    )
  )
}

PublicApp.propTypes = {
  location: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  isSigningOut: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => ({
  isAuthenticated: getIsAuthenticated(state),
  isSigningOut: getIsSigningOut(state)
})

export default withRouter(connect(
  mapStateToProps,
  actions
)(PublicApp))
