import { useContext, useState } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBookmark, faCalendar, faGear, faHeart, faHouse, faLock, faMagnifyingGlass, faRightFromBracket, faUser, faUserPlus } from '@fortawesome/free-solid-svg-icons'
import AuthContext from "../contexts/AuthContext";

import '../styles/Navbar.css';

function SiteNavbar() {
    const context = useContext(AuthContext);
    //testing only
    context.username = true;

    const [expanded, setExpanded] = useState(false);

    return(
        <Navbar bg="light" expand="md" expanded={expanded}>
            <Container>
                <LinkContainer to="/home">
                    <Navbar.Brand>Sneaker Seekers</Navbar.Brand>
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
                                <Button variant="secondary" onClick={() => setExpanded(false)}>
                                    <FontAwesomeIcon icon={faRightFromBracket}/>
                                    Logout
                                </Button>
                            </Nav.Item>
                        </>
                        : <>
                            <Nav.Item className="mb-2 mb-md-0 me-1 me-md-4">
                                <LinkContainer to="/register" onClick={() => setExpanded(false)}>
                                    <Button variant="outline-secondary">
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