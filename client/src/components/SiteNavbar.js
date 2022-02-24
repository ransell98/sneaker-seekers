import { useContext, useState } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark, faCalendar, faGear, faHeart, faHouse, faLock, faMagnifyingGlass, faRightFromBracket, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons';

import '../styles/Navbar.css';  

import AuthContext from "../contexts/AuthContext";

function SiteNavbar() {
    const context = useContext(AuthContext);

    const [expanded, setExpanded] = useState(false);

    function handleLogout() {
        setExpanded(false);
        context.setUsername(null);
    }

    return(
        <Navbar bg="black" variant="dark" expand="md" expanded={expanded}>
            <Container fluid className="mx-4 mx-lg-5">
                <LinkContainer to="/home">
                    <Navbar.Brand>
                        <img
                            alt="Sneaker Seekers logo"
                            src="/logo-v1/sneaker-seekers-logo-v1.svg"
                            width={30}
                            height={30}
                            className="d-inline-block align-top"
                        />{" "}
                        Sneaker Seekers
                    </Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle onClick={() => setExpanded(expanded ? false : "expanded")} />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Item className="ms-0 ms-lg-4">
                            <LinkContainer to="/home" onClick={() => setExpanded(false)}>
                                <Nav.Link>
                                    <FontAwesomeIcon icon={faHouse}/>
                                    Home
                                </Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                        <Nav.Item className="ms-0 ms-lg-4">
                            <LinkContainer to="/events" onClick={() => setExpanded(false)}>
                                <Nav.Link>
                                    <FontAwesomeIcon icon={faCalendar}/>
                                    Events
                                </Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                        <Nav.Item className="ms-0 ms-lg-4">
                            <LinkContainer to="/search" onClick={() => setExpanded(false)}>
                                <Nav.Link>
                                    <FontAwesomeIcon icon={faMagnifyingGlass}/>
                                    Search <span className="d-inline d-md-none d-lg-inline">Sneakers</span>
                                </Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                    </Nav>
                    <Nav className="ms-auto">
                        {context.username
                        ? <>
                            <NavDropdown 
                                title={
                                    <span>
                                        <FontAwesomeIcon icon={faUser}/>
                                        <span className="d-inline d-md-none d-lg-inline">My</span> Account
                                    </span>
                                } 
                                id="basic-nav-dropdown"
                                className="mb-2 mb-md-0 me-1 me-md-4"
                            >
                                <LinkContainer to="/favorites" onClick={() => setExpanded(false)}>
                                    <NavDropdown.Item>
                                        <FontAwesomeIcon icon={faHeart}/>
                                        Favorite Sneakers
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/followed" onClick={() => setExpanded(false)}>
                                    <NavDropdown.Item>
                                        <FontAwesomeIcon icon={faBookmark}/>
                                        Followed Vendors
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Divider/>
                                <LinkContainer to="/account" onClick={() => setExpanded(false)}>
                                    <NavDropdown.Item>
                                        <FontAwesomeIcon icon={faGear}/>
                                        Account Settings
                                    </NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                            <Nav.Item>
                                <Button variant="secondary" onClick={handleLogout}>
                                    <FontAwesomeIcon icon={faRightFromBracket}/>
                                    Logout
                                </Button>
                            </Nav.Item>
                        </>
                        : <>
                            <Nav.Item className="mb-2 mb-md-0 me-1 me-md-4">
                                <LinkContainer to="/register" onClick={() => setExpanded(false)}>
                                    <Button variant="outline-primary">
                                        <FontAwesomeIcon icon={faUserPlus}/>
                                        Register
                                    </Button>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                                <LinkContainer to="/login" onClick={() => setExpanded(false)}>
                                    <Button variant="primary">
                                        <FontAwesomeIcon icon={faLock}/>
                                        Login
                                    </Button>
                                </LinkContainer>
                            </Nav.Item>
                        </>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default SiteNavbar;