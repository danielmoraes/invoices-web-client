import { default as React } from 'react'
import { Route, Switch } from 'react-router-dom'

import * as routes from 'routes'

import EditPage from './EditPage'
import ViewPage from './ViewPage'

const InvoicePage = () => (
  <Switch>

    <Route path={routes.invoiceNew()} render={() => (
      <EditPage isNew />
    )} />

    <Route path={routes.invoiceEdit()} render={() => (
      <EditPage />
    )} />

    <Route path={routes.invoice()} render={() => (
      <ViewPage />
    )} />

  </Switch>
)

export default InvoicePage
