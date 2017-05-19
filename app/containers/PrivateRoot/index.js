import { connect } from 'react-redux'
import { Grid, Row } from 'react-bootstrap'
import { default as React, PropTypes } from 'react'

import { BreadcrumbRouter } from 'components'
import { getAuthUser } from 'redux/reducers'
import routeNames from 'routes/names'

import Header from './Header'
import Routes from './Routes'

const PrivateRoot = ({ authUser }) => (
  <Grid>
    <Row>
      <Header role={authUser.role} />
    </Row>
    <Row>
      <BreadcrumbRouter routes={routeNames} />
      <Routes role={authUser.role} />
    </Row>
  </Grid>
)

PrivateRoot.propTypes = {
  authUser: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  authUser: getAuthUser(state)
})

export default connect(mapStateToProps)(PrivateRoot)
