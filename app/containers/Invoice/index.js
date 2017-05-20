import { default as React } from 'react'
import { Route, Switch } from 'react-router-dom'

import * as routes from 'routes'

import Edit from './Edit'
import New from './New'
import View from './View'

const Invoice = () => (
  <Switch>
    <Route path={routes.invoiceNew()} component={New} />
    <Route path={routes.invoiceEdit()} component={Edit} />
    <Route path={routes.invoice()} component={View} />
  </Switch>
)

export default Invoice
