import { default as React } from 'react'
import { Route, Switch } from 'react-router-dom'

import * as routes from 'routes'

import Edit from './Edit'
import EditPassword from './EditPassword'
import New from './New'
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

    <Route path={routes.userNew()} component={New} />
    <Route path={routes.userEdit()} component={Edit} />
    <Route path={routes.userEditPassword()} component={EditPassword} />
    <Route path={routes.user()} component={View} />

  </Switch>
)

export default User
