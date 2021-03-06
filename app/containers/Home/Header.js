import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import React from 'react'

import { signIn, signUp } from 'routes'

const PublicHeader = () => (
  <Navbar>
    <Navbar.Header>
      <Navbar.Brand>
        <LinkContainer to='/'>
          <a>Invoices</a>
        </LinkContainer>
      </Navbar.Brand>
    </Navbar.Header>
    <Nav pullRight>
      <LinkContainer to={signIn()}>
        <NavItem>Sign in</NavItem>
      </LinkContainer>
      <LinkContainer to={signUp()}>
        <NavItem>Sign up</NavItem>
      </LinkContainer>
    </Nav>
  </Navbar>
)

export default PublicHeader
