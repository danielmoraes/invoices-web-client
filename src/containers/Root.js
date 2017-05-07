import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { default as React, Component, PropTypes } from 'react'
import { connect, Provider } from 'react-redux'

// components
import { Loader } from '../components'

// containers
import { PublicApp, PrivateApp, PrivateRoute } from './'

// redux
import { getIsLoaded, getShowLoadingIndicator } from '../reducers'
import * as actions from '../actions'

class Root extends Component {
  componentDidMount () {
    this.load()
  }

  load () {
    const { loadAuthUser } = this.props
    loadAuthUser()
  }

  render () {
    const { store, isLoaded, showLoadingIndicator } = this.props
    return (
      <Provider store={store}>
        <div>
          { showLoadingIndicator && (
            <Loader />
          )}
          { isLoaded && (
            <Router>
              <Switch>
                <PrivateRoute path='/app' component={PrivateApp} />
                <Route path='/' component={PublicApp} />
              </Switch>
            </Router>
          )}
        </div>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  showLoadingIndicator: PropTypes.bool.isRequired,
  loadAuthUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  isLoaded: getIsLoaded(state),
  showLoadingIndicator: getShowLoadingIndicator(state)
})

export default connect(
  mapStateToProps,
  actions
)(Root)
