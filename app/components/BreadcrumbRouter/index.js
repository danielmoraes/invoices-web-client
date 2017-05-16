import React from 'react'
import { Breadcrumb, BreadcrumbItem } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Route, withRouter } from 'react-router-dom'

const findRouteName = (url, routes) => {
  for (let i = 0; i < routes.length; ++i) {
    if (url.match(routes[i].path)) {
      return routes[i].name
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

const BreadcrumbRouterItem = ({ match, routes }) => {
  const routeName = findRouteName(match.url, routes)
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

const BreadcrumbRouter = ({ location: { pathname }, routes }) => {
  const paths = getPaths(pathname)
  return (
    <Breadcrumb>
      {paths.map(p => (
        <Route key={p} path={p} render={(props) => (
          <BreadcrumbRouterItem routes={routes} {...props} />
        )} />
      ))}
    </Breadcrumb>
  )
}

export default withRouter(BreadcrumbRouter)
