import { AppContainer } from 'react-hot-loader'
import configureStore from './configureStore'
import React from 'react'
import ReactDOM from 'react-dom'
import Root from './containers/Root'

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
