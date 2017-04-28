import React from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

const Header = (props) => (
  <div>
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <LinkContainer to='/'>
            <a>Invoices</a>
          </LinkContainer>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <LinkContainer exact to='/'>
          <NavItem>Dashboard</NavItem>
        </LinkContainer>
        <LinkContainer to='/play'>
          <NavItem>Play</NavItem>
        </LinkContainer>
      </Nav>
      <Nav pullRight>
        <NavItem onClick={props.logout}>Logout</NavItem>
      </Nav>
    </Navbar>
  </div>
)

export default Header
