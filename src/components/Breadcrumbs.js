import React from 'react'
import { Breadcrumb, BreadcrumbItem } from 'react-bootstrap'
import { Route, withRouter } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'

const routes = [
  { path: /^\/app\/invoices$/, title: 'Invoices' },
  { path: /^\/app\/invoices\/new$/, title: 'New Invoice' },
  { path: /^\/app\/invoices\/[\d]+$/, title: 'Invoice' },
  { path: /^\/app\/invoices\/[\d]+\/edit$/, title: 'Edit Invoice' },
  { path: /^\/app\/invoices\/[\d]+\/items\/new$/, title: 'New Invoice Item' },
  { path: /^\/app\/invoices\/[\d]+\/items\/[\d]+\/edit$/,
    title: 'Edit Invoice Item' },
  { path: /^\/app\/users$/, title: 'Users' },
  { path: /^\/app\/users\/new$/, title: 'New User' },
  { path: /^\/app\/users\/[\d]+$/, title: 'User' },
  { path: /^\/app\/users\/[\d]+\/edit$/, title: 'Edit User' },
  { path: /^\/app\/users\/[\d]+\/edit-password$/, title: 'Edit User Password' },
  { path: /^\/app\/account$/, title: 'Account' },
  { path: /^\/app\/account\/edit$/, title: 'Edit Account' },
  { path: /^\/app\/account\/edit-password$/, title: 'Edit Password' }
]

const findRouteName = (url) => {
  for (let i = 0; i < routes.length; ++i) {
    if (url.match(routes[i].path)) {
      return routes[i].title
    }
  }
  return null
}

const getPaths = (pathname) => {
  const paths = []
  pathname.split('/').reduce((p, c) => {
    const path = `${p}/${c}`
    paths.push(path)
    return path
  })
  return paths
}

const BreadcrumbsItem = ({ match }) => {
  const routeName = findRouteName(match.url)
  return (
    routeName ? (
      match.isExact ? (
        <BreadcrumbItem active>{routeName}</BreadcrumbItem>
      ) : (
        <LinkContainer to={match.url}>
          <BreadcrumbItem>{routeName}</BreadcrumbItem>
        </LinkContainer>
      )
    ) : null
  )
}

const Breadcrumbs = ({ location: { pathname } }) => {
  const paths = getPaths(pathname)
  return (
    <Breadcrumb>
      {paths.map(p => (
        <Route key={p} path={p} component={BreadcrumbsItem} />
      ))}
    </Breadcrumb>
  )
}

export default withRouter(Breadcrumbs)
