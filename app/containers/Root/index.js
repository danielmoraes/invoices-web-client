import { BrowserRouter } from 'react-router-dom'
import { connect, Provider } from 'react-redux'
import { default as React, Component, PropTypes } from 'react'

import { LoadingOverlay } from 'components'
import { getIsLoaded, getShowLoadingIndicator } from 'redux/reducers'
import * as actions from 'redux/actions'

import Routes from './Routes'

class Root extends Component {
  componentWillMount () {
    const { loadAuthUser } = this.props
    loadAuthUser()
  }

  render () {
    const { store, isLoaded, showLoadingIndicator } = this.props

    return (
      <Provider store={store}>
        <div>
          { showLoadingIndicator && <LoadingOverlay /> }
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
  showLoadingIndicator: PropTypes.bool.isRequired,
  loadAuthUser: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
  isLoaded: getIsLoaded(state),
  showLoadingIndicator: getShowLoadingIndicator(state)
})

export default connect(mapStateToProps, actions)(Root)
