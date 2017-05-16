import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import {
  InvoicePage,
  InvoicesPage,
  UserPage,
  UsersPage,
  SignOutPage
} from 'containers'
import * as routes from 'routes'

const Routes = () => (
  <Switch>
    <Route path={routes.account()} component={UserPage} />
    <Route path={routes.invoice()} component={InvoicePage} />
    <Route path={routes.invoices()} component={InvoicesPage} />
    <Route path={routes.user()} component={UserPage} />
    <Route path={routes.users()} component={UsersPage} />
    <Route path={routes.signOut()} component={SignOutPage} />
    <Redirect to={routes.invoices()} />
  </Switch>
)

export default Routes
