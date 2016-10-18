import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
import AccountsUIWrapper from '../components/AccountsUIWrapper.jsx';

// Components
import Menu from '/imports/ui/components/menu/Menu.jsx';

class Header extends Component {

  render() {
    return(
      <Navbar inverse>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="/">Smart Yields</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Menu location="Main" />
          <Nav pullRight>
            <NavItem eventKey={1} href="#"><AccountsUIWrapper /></NavItem>
            {/* <NavItem eventKey={2} href="#">Link Right</NavItem> */}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }

}

export default Header;
