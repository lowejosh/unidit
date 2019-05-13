import React from 'react';
import {Navbar, Nav} from 'react-bootstrap';

const NavBarContainer = (props) => {
    return (
        <Navbar style={{paddingLeft: "10rem", paddingRight: "10rem"}} className="nvb navbar-light" expand="lg">
        <Navbar.Brand className="nvb-item" href="#home">UNIDIT</Navbar.Brand>
        <Navbar.Toggle className="nvb-toggle" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link className="nvb-item nvb-selected px-3" href="#home">Home</Nav.Link>
                <Nav.Link className="nvb-item px-3" href="#link">Find a Unit</Nav.Link>
                <Nav.Link className="nvb-item px-3" href="#link">Help</Nav.Link>
                <Nav.Link className="nvb-item px-3" href="#link">University Services</Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link className="nvb-item px-3" href="#link">Login</Nav.Link>
                <Nav.Link className="nvb-item px-3" href="#link">Register</Nav.Link>
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBarContainer;