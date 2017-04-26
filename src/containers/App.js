import Header from '../components/Header'
import DashboardPage from './DashboardPage'
import NotFound from '../components/NotFound'
import PlayPage from './PlayPage'
import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Col, Grid, Row } from 'react-bootstrap'

const App = ({ match }) => (
  <Grid>
    <Row>
      <Col>
        <Header />
      </Col>
    </Row>
    <Row>
      <Col>
        <Switch>
          <Route exact path='/' component={DashboardPage} />
          <Route path='/play' component={PlayPage} />
          <Route component={NotFound} />
        </Switch>
      </Col>
    </Row>
  </Grid>
)

export default App
