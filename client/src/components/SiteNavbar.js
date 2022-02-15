import { useContext } from "react";
import { Button, Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import AuthContext from "../contexts/AuthContext";


function SiteNavbar() {
    const context = useContext(AuthContext);
    //testing only
    context.username = false;

    return(
        <Navbar bg="light" expand="lg">
            <Container>
                <LinkContainer to="/home">
                    <Navbar.Brand>Sneaker Seekers</Navbar.Brand>
                </LinkContainer>
                <Navbar.Toggle />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav>
                        <Nav.Item>
                            <LinkContainer to="/home">
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                        <Nav.Item>
                            <LinkContainer to="/events">
                                <Nav.Link>Events</Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                        <Nav.Item>
                            <LinkContainer to="/search">
                                <Nav.Link>Search Sneakers</Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                    </Nav>
                    <Nav className="ms-auto">
                        {context.username
                        ? <>
                            <NavDropdown title="My Account" id="basic-nav-dropdown">
                                <LinkContainer to="/favorites">
                                    <NavDropdown.Item>
                                        Favorite Sneakers
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to="/followed">
                                    <NavDropdown.Item>
                                        Followed Vendors
                                    </NavDropdown.Item>
                                </LinkContainer>
                                <NavDropdown.Divider/>
                                <LinkContainer to="/account">
                                    <NavDropdown.Item>
                                        Account Settings
                                    </NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                            <Nav.Item>
                                <Button variant="secondary">Logout</Button>
                            </Nav.Item>
                        </>
                        : <>
                            <Nav.Item>
                                <LinkContainer to="/login">
                                    <Button variant="secondary">Login</Button>
                                </LinkContainer>
                            </Nav.Item>
                            <Nav.Item>
                                <LinkContainer to="/register">
                                    <Nav.Link>Register</Nav.Link>
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