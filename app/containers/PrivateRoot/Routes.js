import React from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'

import {
  Invoice,
  Invoices,
  User,
  Users,
  SignOut
} from 'containers'
import * as routes from 'routes'

const Routes = () => (
  <Switch>
    <Route path={routes.account()} component={User} />
    <Route path={routes.invoice()} component={Invoice} />
    <Route path={routes.invoices()} component={Invoices} />
    <Route path={routes.user()} component={User} />
    <Route path={routes.users()} component={Users} />
    <Route path={routes.signOut()} component={SignOut} />
    <Redirect to={routes.invoices()} />
  </Switch>
)

export default Routes
