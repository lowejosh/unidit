import React from 'react'; 
 import {Navbar, Nav} from 'react-bootstrap';

const NavBarContainer = (props) => {
    let forumSel = "";
    let topicSel = "";
    let selectedSel = "";

    
    if (!props.blank) {

        if (props.sel == "forum") {
            forumSel = "nvb-selected";
        } else if (props.sel == "select") {
            selectedSel = "nvb-selected";
        }
    }

    if (props.blank) {
        return (
            <Navbar style={{paddingLeft: "10%", paddingRight: "10%"}} className="nvb navbar-light" expand="lg">
            <Navbar.Brand className="nvb-brand" href="#home">MyUni</Navbar.Brand>
            <Navbar.Toggle className="nvb-toggle" aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link className={"nvb-item px-3"} href="/">Forum</Nav.Link>
                    <Nav.Link className={"nvb-item px-3"} href="#">Add a Topic</Nav.Link>
                    {/* <Nav.Link className="nvb-item px-3" href="#link">Help</Nav.Link> */}
                    <Nav.Link className={"nvb-item px-3"} href="/select">Select University</Nav.Link>
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        )

    } else {
        const {
            user,
            signOut,
            signInWithGoogle,
        } = props.auth;

        return (
            <Navbar style={{paddingLeft: "10%", paddingRight: "10%"}} className="nvb navbar-light" expand="lg">
            <Navbar.Brand className="nvb-brand" href="#home">MyUni</Navbar.Brand>
            <Navbar.Toggle className="nvb-toggle" aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link className={"nvb-item px-3 " + forumSel} href="/">Forum</Nav.Link>
                    <Nav.Link className={"nvb-item px-3 " + topicSel} href="#">Add a Topic</Nav.Link>
                    {/* <Nav.Link className="nvb-item px-3" href="#link">Help</Nav.Link> */}
                    <Nav.Link className={"nvb-item px-3 " + selectedSel} href="/select">Select University</Nav.Link>
                </Nav>
                <Nav>
                    {
                        user
                        ? <Nav.Link className="nvb-item px-3" onClick={signOut}>Sign out from {user.displayName}</Nav.Link>
                        : <Nav.Link className="nvb-item px-3" onClick={signInWithGoogle}>Sign in with Google</Nav.Link>
                    }
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        )
    }

}

export default NavBarContainer;