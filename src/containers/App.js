import { Grid, Row } from 'react-bootstrap'
import { connect } from 'react-redux'
import { default as React, PropTypes } from 'react'
import { Route, Switch } from 'react-router-dom'

// containers
import DashboardPage from './DashboardPage'
import PlayPage from './PlayPage'

// components
import Header from '../components/Header'

// redux
import { logout } from '../actions'

const App = ({ dispatch }) => (
  <Grid>
    <Row>
      <Header logout={() => dispatch(logout())} />
    </Row>
    <Row>
      <Switch>
        <Route path='/play' component={PlayPage} />
        <Route path='/' component={DashboardPage} />
      </Switch>
    </Row>
  </Grid>
)

App.propTypes = {
  dispatch: PropTypes.func.isRequired
}

export default connect()(App)
