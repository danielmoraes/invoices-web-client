import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import {
  Alert,
  NavDropdown,
  MenuItem,
  Navbar,
  Nav,
  NavItem
} from 'react-bootstrap'

import { UserRole } from 'api/enums'
import * as routes from 'routes'

import styles from './Header.css'

const PrivateHeader = ({ role, showIndicator }) => (
  <div>
    { showIndicator && (
      <Alert className={styles.indicator} bsStyle='warning'>
        <strong>Loading...</strong>
      </Alert>
    ) }
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <LinkContainer to={routes.privateRoot()}>
            <a>Invoices</a>
          </LinkContainer>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <LinkContainer to={routes.invoices()}>
          <NavItem>Invoices</NavItem>
        </LinkContainer>
        { role === UserRole.ADMIN && (
          <LinkContainer to={routes.users()}>
            <NavItem>Users</NavItem>
          </LinkContainer>
        ) }
      </Nav>
      <Nav pullRight>
        <NavDropdown title='Settings' id='settings-dropdown'>
          <LinkContainer to={routes.account()}>
            <MenuItem>Account</MenuItem>
          </LinkContainer>
          <MenuItem divider />
          <LinkContainer to={routes.signOut()}>
            <MenuItem>Sign out</MenuItem>
          </LinkContainer>
        </NavDropdown>
      </Nav>
    </Navbar>
  </div>
)

export default PrivateHeader
