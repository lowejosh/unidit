import React from 'react'; 
 import {Navbar, Nav} from 'react-bootstrap';

const NavBarContainer = (props) => {
    const {
        user,
        signOut,
        signInWithGoogle,
    } = props.auth;
    console.log(user);

    return (
        <Navbar style={{paddingLeft: "10%", paddingRight: "10%"}} className="nvb navbar-light" expand="lg">
        <Navbar.Brand className="nvb-brand" href="#home">MyUni</Navbar.Brand>
        <Navbar.Toggle className="nvb-toggle" aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link className="nvb-item nvb-selected px-3" href="#home">Home</Nav.Link>
                <Nav.Link className="nvb-item px-3" href="#link">Find a Topic</Nav.Link>
                {/* <Nav.Link className="nvb-item px-3" href="#link">Help</Nav.Link> */}
                <Nav.Link className="nvb-item px-3" href="#link">University Services</Nav.Link>
            </Nav>
            <Nav>
                {
                    user
                    ? <Nav.Link className="nvb-item px-3" onClick={signOut}>Sign Out {user.displayName}</Nav.Link>
                    : <Nav.Link className="nvb-item px-3" onClick={signInWithGoogle}>Sign in with Google</Nav.Link>
                }
            </Nav>
        </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBarContainer;