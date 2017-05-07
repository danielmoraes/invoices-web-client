import { Grid, Row } from 'react-bootstrap'
import { default as React, PropTypes } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

// containers
import { PlayPage, SignOut } from './'

// components
import { DuckPage, PrivateHeader } from '../components'

const PrivateApp = ({ match }) => (
  <Grid>
    <Row>
      <PrivateHeader />
    </Row>
    <Row>
      <Switch>
        <Route path={`${match.url}/play`} component={PlayPage} />
        <Route path={`${match.url}/signout`} component={SignOut} />
        <Route path={`${match.url}`} component={DuckPage} />
      </Switch>
    </Row>
  </Grid>
)

PrivateApp.propTypes = {
  match: PropTypes.object.isRequired
}

export default withRouter(PrivateApp)
