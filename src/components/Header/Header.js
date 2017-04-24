import React from 'react'
import { NavLink } from 'react-router-dom'

import styles from './Header.css'

const Header = () => (
  <div>
    <h1>Invoices</h1>
    <NavLink exact to='/' activeClassName={styles.routeActive}>
      Home
    </NavLink>
    {' · '}
    <NavLink to='/play' activeClassName={styles.routeActive}>
      Play
    </NavLink>
  </div>
)

export default Header
