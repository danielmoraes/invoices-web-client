import { BrowserRouter } from 'react-router-dom'
import { connect, Provider } from 'react-redux'
import { default as React, Component, PropTypes } from 'react'

import { LoadingOverlay } from 'components'
import { getIsLoaded, getShowLoadingOverlay } from 'redux/reducers'
import * as actions from 'redux/actions'

import Routes from './Routes'

class Root extends Component {
  componentWillMount () {
    const { loadAuthUser } = this.props
    loadAuthUser()
  }

  render () {
    const { store, isLoaded, showLoadingOverlay } = this.props

    return (
      <Provider store={store}>
        <div>
          { showLoadingOverlay && <LoadingOverlay /> }
          { isLoaded && (
            <BrowserRouter>
              <Routes />
            </BrowserRouter>
          ) }
        </div>
      </Provider>
    )
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  showLoadingOverlay: PropTypes.bool.isRequired,
  loadAuthUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  isLoaded: getIsLoaded(state),
  showLoadingOverlay: getShowLoadingOverlay(state)
})

export default connect(mapStateToProps, actions)(Root)
