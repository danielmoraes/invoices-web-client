import React from 'react'
import { Switch } from 'react-router-dom'

import { Home, PrivateRoot } from 'containers'
import * as routes from 'routes'

import PrivateRoute from './PrivateRoute'
import PublicRoute from './PublicRoute'

const Routes = () => (
  <Switch>
    <PrivateRoute path={routes.privateRoot()} component={PrivateRoot} />
    <PublicRoute path={routes.home()} component={Home} />
  </Switch>
)

export default Routes
