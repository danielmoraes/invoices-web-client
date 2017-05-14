import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { NavDropdown, MenuItem, Navbar, Nav, NavItem } from 'react-bootstrap'

// app routes
import * as routes from '../routes'

const PrivateHeader = () => (
  <div>
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <LinkContainer to={routes.privateApp()}>
            <a>Invoices</a>
          </LinkContainer>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <LinkContainer to={routes.invoices()}>
          <NavItem>Invoices</NavItem>
        </LinkContainer>
        <LinkContainer to={routes.users()}>
          <NavItem>Users</NavItem>
        </LinkContainer>
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
