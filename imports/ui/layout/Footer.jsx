import React from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';

import AccountsUIWrapper from '../components/AccountsUIWrapper.jsx';


class Footer extends React.Component {
    render() {
        return(
            <footer id="colophon">
                <div className="container">
                    <p>Smart Yields &copy; 2016</p>
                </div>
            </footer>
        )
    }
}

export default Footer;
