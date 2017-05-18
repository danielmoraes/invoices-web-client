import { default as React } from 'react'
import { Route, Switch } from 'react-router-dom'

import * as routes from 'routes'

import Edit from './Edit'
import New from './New'

const InvoiceItem = () => (
  <Switch>
    <Route path={routes.invoiceItemNew()} component={New} />
    <Route path={routes.invoiceItemEdit()} component={Edit} />
  </Switch>
)

export default InvoiceItem
