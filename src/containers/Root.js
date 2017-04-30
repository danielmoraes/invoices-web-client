import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { default as React, Component, PropTypes } from 'react'
import { connect, Provider } from 'react-redux'

// components
import Loader from '../components/Loader'

// containers
import App from './App'
import LoginPage from './LoginPage'
import PrivateRoute from './PrivateRoute'

// redux
import { isAppLoaded, isAppFetching } from '../reducers'
import * as actions from '../actions'

class Root extends Component {
  componentDidMount () {
    this.load()
  }

  load () {
    const { authenticate, appLoad } = this.props
    authenticate().then(() => appLoad())
  }

  render () {
    const { store, isAppLoaded, isAppFetching } = this.props
    return (
      <Provider store={store}>
        <div>
          {
            isAppFetching && (
              <Loader />
            )
          }
          {
            isAppLoaded && (
              <Router>
                <Switch>
                  <Route path='/login' component={LoginPage} />
                  <PrivateRoute path='/' component={App} />
                </Switch>
              </Router>
            )
          }
        </div>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  isAppLoaded: PropTypes.bool.isRequired,
  isAppFetching: PropTypes.bool.isRequired,
  appLoad: PropTypes.func.isRequired,
  authenticate: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    isAppLoaded: isAppLoaded(state),
    isAppFetching: isAppFetching(state)
  }
}

export default connect(
  mapStateToProps,
  actions
)(Root)
