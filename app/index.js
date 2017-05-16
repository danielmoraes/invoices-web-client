import { AppContainer } from 'react-hot-loader'
import Promise from 'promise-polyfill'
import React from 'react'
import ReactDOM from 'react-dom'

import { Root } from 'containers'
import configureStore from 'redux/store'

if (!window.Promise) {
  window.Promise = Promise
}

const store = configureStore()

const render = (Component) => {
  ReactDOM.render(
    <AppContainer>
      <Component store={store} />
    </AppContainer>,
    document.getElementById('root')
  )
}

render(Root)

if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    render(Root)
  })
}
