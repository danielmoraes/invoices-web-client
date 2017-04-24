import Header from '../components/Header'
import NotFound from '../components/NotFound'
import HomePage from './HomePage'
import PlayPage from './PlayPage'
import React from 'react'
import { Route, Switch } from 'react-router-dom'

import '../styles/core.css'

const App = ({ match }) => (
  <div className='text-center'>
    <Header />
    <div style={{ padding: 20 }}>
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/play' component={PlayPage} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </div>
)

export default App
