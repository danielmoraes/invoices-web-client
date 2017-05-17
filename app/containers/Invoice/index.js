import { default as React } from 'react'
import { Route, Switch } from 'react-router-dom'

import * as routes from 'routes'

import Edit from './Edit'
import View from './View'

const Invoice = () => (
  <Switch>

    <Route path={routes.invoiceNew()} render={() => (
      <Edit isNew />
    )} />

    <Route path={routes.invoiceEdit()} render={() => (
      <Edit />
    )} />

    <Route path={routes.invoice()} render={() => (
      <View />
    )} />

  </Switch>
)

export default Invoice
