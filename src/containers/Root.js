import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { default as React, Component, PropTypes } from 'react'
import { connect, Provider } from 'react-redux'

// containers
import App from './App'
import LoginPage from './LoginPage'
import PrivateRoute from './PrivateRoute'

// redux
import { isAppLoaded } from '../reducers'
import * as actions from '../actions'

// styles
import styles from './Root.css'

class Root extends Component {
  componentDidMount () {
    this.load()
  }

  load () {
    const { authenticate, appLoad } = this.props
    authenticate().then(() => appLoad())
  }

  render () {
    const { store, isAppLoaded } = this.props
    return (
      isAppLoaded ? (
        <Provider store={store}>
          <Router>
            <Switch>
              <Route path='/login' component={LoginPage} />
              <PrivateRoute path='/' component={App} />
            </Switch>
          </Router>
        </Provider>
      ) : (
        <div className={styles.loading}>
          Loading...
        </div>
      )
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  isAppLoaded: PropTypes.bool.isRequired,
  appLoad: PropTypes.func.isRequired,
  authenticate: PropTypes.func.isRequired
}

const mapStateToProps = (state) => {
  return {
    isAppLoaded: isAppLoaded(state)
  }
}

export default connect(
  mapStateToProps,
  actions
)(Root)
