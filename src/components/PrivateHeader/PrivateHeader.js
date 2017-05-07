import { default as React, PropTypes } from 'react'
import { withRouter } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

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
        <LinkContainer exact to={`${match.url}`}>
          <NavItem>Duck</NavItem>
        </LinkContainer>
        <LinkContainer to={`${match.url}/play`}>
          <NavItem>Play</NavItem>
        </LinkContainer>
      </Nav>
      <Nav pullRight>
        <LinkContainer to={`${match.url}/signout`}>
          <NavItem>Sign out</NavItem>
        </LinkContainer>
      </Nav>
    </Navbar>
  </div>
)

PrivateHeader.propTypes = {
  match: PropTypes.object.isRequired
}

export default withRouter(PrivateHeader)
