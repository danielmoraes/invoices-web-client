import { Grid, Row } from 'react-bootstrap'
import React from 'react'

import { BreadcrumbRouter } from 'components'
import routeNames from 'routes/names'

import Header from './Header'
import Routes from './Routes'

const PrivateRoot = () => (
  <Grid>
    <Row>
      <Header />
    </Row>
    <Row>
      <BreadcrumbRouter routes={routeNames} />
      <Routes />
    </Row>
  </Grid>
)

export default PrivateRoot
