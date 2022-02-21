import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUpRightFromSquare, faEye, faEyeSlash, faLock, faUserPlus } from '@fortawesome/free-solid-svg-icons';

import '../styles/LoginAndRegister.css';

import AuthContext from "../contexts/AuthContext";

import Page from "./Page";
import Loading from "./Loading";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const context = useContext(AuthContext);
    const navigate = useNavigate();

    function toggleIsPasswordVisible() {
        setIsPasswordVisible(!isPasswordVisible);
    }

    function onSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            context.setUsername(username);
            navigate("/");
        }, 1000);
    }

    function renderLoginForm() {
        return (
            <Form onSubmit={onSubmit}>
                <Form.Group controlId="formUsername" className="mt-2 mb-4">
                    <Row>
                        <Col md={3}>
                            <Form.Label>Username</Form.Label>
                        </Col>
                        <Col xs={10} md={8}>
                            <Form.Control
                                type="text"
                                placeholder="Username"
                                onChange={(event) => setUsername(event.target.value)}
                                value={username}
                                disabled={isLoading}
                                required
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group controlId="formPassword" className="my-4">
                    <Row>
                        <Col md={3}>
                            <Form.Label>Password</Form.Label>
                        </Col>
                        <Col xs={10} md={8}>
                            <Form.Control
                                type={
                                    isPasswordVisible
                                    ? "text"
                                    : "password"
                                }
                                placeholder="Password"
                                onChange={(event) => setPassword(event.target.value)}
                                value={password}
                                disabled={isLoading}
                                required
                            />
                        </Col>
                        <Col xs={1}>
                            <FontAwesomeIcon
                                icon={
                                    isPasswordVisible
                                    ? faEyeSlash
                                    : faEye
                                }
                                onClick={toggleIsPasswordVisible}
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Row>
                    <Button
                        variant="primary"
                        type="submit"
                        className="col-4 offset-4"
                        disabled={isLoading}
                    >
                        Sign In Now
                    </Button>
                </Row>
            </Form>
        );
    }

    function renderLoginCard() {
        return (
            <Card className="card-login flex-fill">
                <Card.Header>
                    <FontAwesomeIcon icon={faLock}/>
                    Returning User
                </Card.Header>
                <Card.Body>
                    {renderLoginForm()}
                </Card.Body>
            </Card>
        );
    }

    function renderRegisterButton() {
        return (
            <LinkContainer to="/register">
                <Row className="mt-4 mt-xl-5">
                    <Button
                        variant="primary"
                        size="lg"
                        className="col-6 offset-3 col-md-4 offset-md-4"
                        disabled={isLoading}
                    >
                        Register
                        <FontAwesomeIcon icon={faArrowUpRightFromSquare}/>
                    </Button>
                </Row>
            </LinkContainer>
        );
    }

    function renderRegisterCard() {
        return(
            <Card className="card-register flex-fill">
                <Card.Header>
                    <FontAwesomeIcon icon={faUserPlus}/>
                    New User
                </Card.Header>
                <Card.Body>
                    <p className="">
                        Create an account to keep track of your favorite sneakers and vendors, or become a vendor and start selling sneakers at upcoming events.
                    </p>
                    {renderRegisterButton()}
                </Card.Body>
            </Card>
        );
    }

    return (
        <Page title="User Login">
            <Row>
                <Col xs={12} lg={6} className="d-flex">
                    {renderRegisterCard()}
                </Col>
                <Col xs={12} lg={6} className="d-flex">
                    {renderLoginCard()}
                </Col>
            </Row>
            {isLoading
            ? <Loading/>
            : <></>}
        </Page>
    );
}

export default Login;