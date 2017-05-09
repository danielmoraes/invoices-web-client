import { Grid, Row } from 'react-bootstrap'
import { default as React, PropTypes } from 'react'
import { Redirect, Route, Switch, withRouter } from 'react-router-dom'

// containers
import { PlayPage, SignOut } from './'

// components
import {
  AccountEditPage,
  AccountEditPasswordPage,
  AccountViewPage,
  Breadcrumbs,
  DuckPage,
  InvoiceListPage,
  InvoiceEditPage,
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
      <Breadcrumbs />
      <Switch>

        <Route
          path={`${match.url}/duck`}
          component={DuckPage} />
        <Route
          path={`${match.url}/play`}
          component={PlayPage} />
        <Route
          path={`${match.url}/signout`}
          component={SignOut} />
        <Route
          path={`${match.url}/account/edit-password`}
          component={AccountEditPasswordPage} />
        <Route
          path={`${match.url}/account/edit`}
          component={AccountEditPage} />
        <Route
          path={`${match.url}/account`}
          component={AccountViewPage} />
        <Route
          path={`${match.url}/invoices/new`}
          component={InvoiceNewPage} />
        <Route
          path={`${match.url}/invoices/:id/edit`}
          component={InvoiceEditPage} />
        <Route
          path={`${match.url}/invoices/:id`}
          component={InvoiceViewPage} />
        <Route
          path={`${match.url}/invoices`}
          component={InvoiceListPage} />
        <Redirect to={`${match.url}/invoices`} />

      </Switch>
    </Row>
  </Grid>
)

PrivateApp.propTypes = {
  match: PropTypes.object.isRequired
}

export default withRouter(PrivateApp)
