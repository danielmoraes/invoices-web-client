import { default as React, PropTypes } from 'react'
import { withRouter } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { NavDropdown, MenuItem, Navbar, Nav, NavItem } from 'react-bootstrap'

const PrivateHeader = ({ match, signOut }) => (
  <div>
    <Navbar>
      <Navbar.Header>
        <Navbar.Brand>
          <LinkContainer to={`${match.url}`}>
            <a>Invoices</a>
          </LinkContainer>
        </Navbar.Brand>
      </Navbar.Header>
      <Nav>
        <LinkContainer to={`${match.url}/invoices`}>
          <NavItem>Invoices</NavItem>
        </LinkContainer>
        <LinkContainer to={`${match.url}/duck`}>
          <NavItem>Duck</NavItem>
        </LinkContainer>
        <LinkContainer to={`${match.url}/play`}>
          <NavItem>Play</NavItem>
        </LinkContainer>
      </Nav>
      <Nav pullRight>
        <NavDropdown eventKey={3} title='Settings' id='settings-dropdown'>
          <LinkContainer to={`${match.url}/account`}>
            <MenuItem eventKey='1'>Account</MenuItem>
          </LinkContainer>
          <MenuItem divider />
          <LinkContainer to={`${match.url}/signout`}>
            <MenuItem eventKey='2'>Sign out</MenuItem>
          </LinkContainer>
        </NavDropdown>
      </Nav>
    </Navbar>
  </div>
)

PrivateHeader.propTypes = {
  match: PropTypes.object.isRequired
}

export default withRouter(PrivateHeader)
