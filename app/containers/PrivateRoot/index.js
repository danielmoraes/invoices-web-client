import { connect } from 'react-redux'
import { Grid, Row } from 'react-bootstrap'
import { default as React, PropTypes } from 'react'

import { BreadcrumbRouter } from 'components'
import { getAuthUser, getIsFetching } from 'redux/reducers'
import routeNames from 'routes/names'

import Header from './Header'
import Routes from './Routes'

const PrivateRoot = ({ authUser, isFetching }) => (
  <Grid>
    <Row>
      <Header role={authUser.role} showIndicator={isFetching} />
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
  authUser: getAuthUser(state),
  isFetching: getIsFetching(state)
})

export default connect(mapStateToProps)(PrivateRoot)
