import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem } from 'react-bootstrap'
import React from 'react'

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
      <LinkContainer to='/signin'>
        <NavItem>Sign in</NavItem>
      </LinkContainer>
      <LinkContainer to='/signup'>
        <NavItem>Sign up</NavItem>
      </LinkContainer>
    </Nav>
  </Navbar>
)

export default PublicHeader
