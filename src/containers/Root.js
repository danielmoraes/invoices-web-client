import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom'
import { default as React, Component, PropTypes } from 'react'
import { connect, Provider } from 'react-redux'

import { PublicApp, PrivateApp, Loader } from '../components'
import { PrivateRoute } from '../containers'
import {
  getIsLoaded,
  getIsAuthenticated,
  getIsSigningOut,
  getShowLoadingIndicator
} from '../reducers'
import * as actions from '../actions'
import * as routes from '../routes'

class Root extends Component {
  componentWillMount () {
    const { loadAuthUser } = this.props
    loadAuthUser()
  }

  render () {
    const {
      store,
      isLoaded,
      isAuthenticated,
      showLoadingIndicator
    } = this.props

    return (
      <Provider store={store}>
        <div>
          { showLoadingIndicator && <Loader /> }
          { isLoaded && (
            <BrowserRouter>
              <Switch>

                <PrivateRoute
                  path={routes.privateApp()}
                  component={PrivateApp} />

                { isAuthenticated && (
                  <Route render={({ location: { state } }) => (
                    <Redirect to={state ? state.from : routes.privateApp()} />
                  )} />
                ) }

                <Route path={routes.publicApp()} component={PublicApp} />

              </Switch>
            </BrowserRouter>
          ) }
        </div>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  isAuthenticated: PropTypes.bool.isRequired,
  showLoadingIndicator: PropTypes.bool.isRequired,
  loadAuthUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  isLoaded: getIsLoaded(state),
  isAuthenticated: getIsAuthenticated(state) && !getIsSigningOut(state),
  showLoadingIndicator: getShowLoadingIndicator(state)
})

export default connect(mapStateToProps, actions)(Root)
