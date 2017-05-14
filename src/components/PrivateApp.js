import { Grid, Row } from 'react-bootstrap'
import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import {
  AccountEditPage,
  AccountEditPasswordPage,
  AccountViewPage,
  Breadcrumbs,
  InvoiceEditPage,
  InvoiceNewPage,
  UserListPage,
  UserEditPage,
  UserEditPasswordPage,
  UserNewPage,
  UserViewPage,
  PrivateHeader,
  SignOut
} from '../components'
import { InvoiceViewPage, InvoiceListPage } from '../containers'
import * as routes from '../routes'

const PrivateApp = () => (
  <Grid>
    <Row>
      <PrivateHeader />
    </Row>
    <Row>
      <Breadcrumbs />
      <Switch>

        <Route path={routes.signOut()} component={SignOut} />

        <Route path={routes.accountEditPassword()}
          component={AccountEditPasswordPage} />

        <Route path={routes.accountEdit()} component={AccountEditPage} />

        <Route path={routes.account()} component={AccountViewPage} />

        <Route path={routes.invoiceNew()} component={InvoiceNewPage} />

        <Route path={routes.invoiceEdit()} component={InvoiceEditPage} />

        <Route path={routes.invoice()} component={InvoiceViewPage} />

        <Route path={routes.invoices()} component={InvoiceListPage} />

        <Route path={routes.userNew()} component={UserNewPage} />

        <Route path={routes.userEditPassword()}
          component={UserEditPasswordPage} />

        <Route path={routes.userEdit()} component={UserEditPage} />

        <Route path={routes.user()} component={UserViewPage} />

        <Route path={routes.users()} component={UserListPage} />

        <Redirect to={routes.invoices()} />

      </Switch>
    </Row>
  </Grid>
)

export default PrivateApp
