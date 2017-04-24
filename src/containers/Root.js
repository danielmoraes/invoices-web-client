import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import React, { PropTypes } from 'react'
import { Route } from 'react-router'

const Root = ({ store }) => (
  <Provider store={store}>
    <Router>
      <Route path='/' component={App} />
    </Router>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
