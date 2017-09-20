import React, { Component } from 'react';
import { Navbar, NavbarBrand, NavItem, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { IndexLinkContainer } from 'react-router-bootstrap';

// Navabar Component appears in to top of screen, support routing function,
// collapse when the screen size is too small. Based on the Navbar Module 
// imported from react-bootstrap
export default class NavbarComponent extends Component {

    render() {
        return (
            <Navbar inverse collapseOnSelect className="navbar-nomargin">
                <Navbar.Header>
                    <Navbar.Brand>
                        <a >Restaurant chain</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav >
                        <IndexLinkContainer to="/" activeClassName="active">
                            <NavItem eventKey={1} > Restaurants List </NavItem>
                        </IndexLinkContainer>
                        <IndexLinkContainer to="/recipes" activeClassName="active">
                            <NavItem eventKey={2} >Recipes List</NavItem>
                        </IndexLinkContainer>
                        <IndexLinkContainer to="/employees" activeClassName="active">
                            <NavItem eventKey={3} >Employee List</NavItem>
                        </IndexLinkContainer>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
} 