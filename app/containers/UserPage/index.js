import { default as React } from 'react'
import { Route, Switch } from 'react-router-dom'

import * as routes from 'routes'

import EditPage from './EditPage'
import EditPasswordPage from './EditPasswordPage'
import ViewPage from './ViewPage'

const UserPage = () => (
  <Switch>

    <Route path={routes.accountEdit()} render={() => (
      <EditPage isAccount />
    )} />

    <Route path={routes.accountEditPassword()} render={() => (
      <EditPasswordPage isAccount />
    )} />

    <Route path={routes.account()} render={() => (
      <ViewPage isAccount />
    )} />

    <Route path={routes.userNew()} render={() => (
      <EditPage isNew />
    )} />

    <Route path={routes.userEdit()} render={() => (
      <EditPage />
    )} />

    <Route path={routes.userEditPassword()} render={() => (
      <EditPasswordPage />
    )} />

    <Route path={routes.user()} render={() => (
      <ViewPage />
    )} />

  </Switch>
)

export default UserPage
