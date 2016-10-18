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
          {/* <Nav>
            <NavItem eventKey={1} href="/posts">Posts</NavItem>
            <NavItem eventKey={2} href="#">Link</NavItem>
            <NavDropdown eventKey={3} title="Dropdown" id="basic-nav-dropdown">
            <MenuItem eventKey={3.1}>Action</MenuItem>
            <MenuItem eventKey={3.2}>Another action</MenuItem>
            <MenuItem eventKey={3.3}>Something else here</MenuItem>
            <MenuItem divider />
            <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
          </Nav> */}
          {/* <ul className="nav navbar-nav">
            <li><a href="#">Test</a></li>
            <li><a href="#">Testing</a></li>
          </ul> */}

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
