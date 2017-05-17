import { default as React } from 'react'
import { Route, Switch } from 'react-router-dom'

import * as routes from 'routes'

import Edit from './Edit'
import EditPassword from './EditPassword'
import View from './View'

const User = () => (
  <Switch>

    <Route path={routes.accountEdit()} render={() => (
      <Edit isAccount />
    )} />

    <Route path={routes.accountEditPassword()} render={() => (
      <EditPassword isAccount />
    )} />

    <Route path={routes.account()} render={() => (
      <View isAccount />
    )} />

    <Route path={routes.userNew()} render={() => (
      <Edit isNew />
    )} />

    <Route path={routes.userEdit()} render={() => (
      <Edit />
    )} />

    <Route path={routes.userEditPassword()} render={() => (
      <EditPassword />
    )} />

    <Route path={routes.user()} render={() => (
      <View />
    )} />

  </Switch>
)

export default User
