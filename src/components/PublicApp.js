import React from 'react'
import { Route, Switch } from 'react-router-dom'

import { HomePage, NotFoundPage } from '../components'
import * as routes from '../routes'

const PublicApp = () => (
  <Switch>

    <Route exact path={routes.home()} component={HomePage} />

    <Route path={routes.signIn()} component={HomePage} />

    <Route path={routes.signUp()} component={HomePage} />

    <Route path={routes.forgotPassword()} component={HomePage} />

    <Route component={NotFoundPage} />

  </Switch>
)

export default PublicApp
