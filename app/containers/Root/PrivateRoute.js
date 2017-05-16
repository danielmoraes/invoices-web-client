import { default as React, PropTypes } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { getIsAuthenticated, getIsSigningOut } from 'redux/reducers'
import * as routes from 'routes'

const PrivateRoute =
  ({ component: Component, isAuthenticated, isSigningOut, ...rest }) => (
    <Route {...rest} render={
      (props) => (
        isAuthenticated && !isSigningOut ? (
          <Component {...props} />
        ) : (
          <Redirect to={{
            pathname: isSigningOut ? routes.home() : routes.signIn(),
            state: { from: props.location }
          }} />
        )
      )
    } />
  )

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  isSigningOut: PropTypes.bool.isRequired,
  component: PropTypes.func.isRequired,
  location: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  isAuthenticated: getIsAuthenticated(state),
  isSigningOut: getIsSigningOut(state)
})

export default connect(mapStateToProps)(PrivateRoute)
