import { Grid, Row } from 'react-bootstrap'
import { default as React, PropTypes } from 'react'
import { Route, Switch, withRouter } from 'react-router-dom'

// containers
import { PlayPage, SignOut } from './'

// components
import {
  AccountPage,
  DuckPage,
  InvoiceListPage,
  InvoiceNewPage,
  InvoiceViewPage,
  PrivateHeader
} from '../components'

const PrivateApp = ({ match }) => (
  <Grid>
    <Row>
      <PrivateHeader />
    </Row>
    <Row>
      <Switch>
        <Route path={`${match.url}/duck`} component={DuckPage} />
        <Route path={`${match.url}/play`} component={PlayPage} />
        <Route path={`${match.url}/signout`} component={SignOut} />
        <Route path={`${match.url}/account`} component={AccountPage} />
        <Route path={`${match.url}/new-invoice`} component={InvoiceNewPage} />
        <Route path={`${match.url}/invoices/:id`} component={InvoiceViewPage} />
        <Route path={`${match.url}/`} component={InvoiceListPage} />
      </Switch>
    </Row>
  </Grid>
)

PrivateApp.propTypes = {
  match: PropTypes.object.isRequired
}

export default withRouter(PrivateApp)
