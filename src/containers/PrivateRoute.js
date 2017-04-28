import { default as React, PropTypes } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { connect } from 'react-redux'

// redux
import { getUser } from '../reducers'

const PrivateRoute = ({ component: Component, isAuthenticated, ...rest }) => (
  <Route {...rest} render={props => (
    isAuthenticated ? (
      <Component {...props} />
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }} />
    )
  )} />
)

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: getUser(state).name !== undefined
  }
}

export default connect(
  mapStateToProps
)(PrivateRoute)
