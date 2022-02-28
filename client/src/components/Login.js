import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faLock } from '@fortawesome/free-solid-svg-icons';

import '../styles/LoginAndRegister.css';

import AuthContext from "../contexts/AuthContext";
import { login } from "../services/auth-api";

import Page from "./Page";
import Loading from "./Loading";
import ErrorCard from "./ErrorCard";

function Login() {
    const [credentials, setCredentials] = useState({
        username: "",
        password: ""
    });
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    
    
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    function toggleIsPasswordVisible() {
        setIsPasswordVisible(!isPasswordVisible);
    }

    function setUsername(event) {
        const clone = { ...credentials };
        clone["username"] = event.target.value;
        setCredentials(clone);
    }

    function setPassword(event) {
        const clone = { ...credentials };
        clone["password"] = event.target.value;
        setCredentials(clone);
    }

    function onSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        setErrorMessage("");
        login(credentials)
            .then(principal => {
                authContext.login(principal);
                navigate("/");
            })
            .catch((error) => {
                setIsLoading(false);
                setErrorMessage("Login failed.");
            });
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
                                disabled={isLoading}
                                onChange={setUsername}
                                placeholder="Username"
                                required
                                type="text"
                                value={credentials.username}
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
                                disabled={isLoading}
                                onChange={setPassword}
                                placeholder="Password"
                                required
                                type={
                                    isPasswordVisible
                                    ? "text"
                                    : "password"
                                }
                                value={credentials.password}
                            />
                        </Col>
                        <Col xs={1}>
                            <FontAwesomeIcon
                                icon={
                                    isPasswordVisible
                                    ? faEye
                                    : faEyeSlash
                                }
                                onClick={toggleIsPasswordVisible}
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Row>
                    <Button
                        className="col-4 offset-4"
                        disabled={isLoading}
                        type="submit"
                        variant="primary"
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
                    User Login
                </Card.Header>
                <Card.Body>
                    {renderLoginForm()}
                </Card.Body>
            </Card>
        );
    }

    return (
        <Page>
            <Row>
                <Col xs={12} lg={{span: 6, offset: 3}} className="d-flex">
                    {renderLoginCard()}
                </Col>
                <Col xs={12} lg={{span: 6, offset: 3}} className="d-flex">
                    <p className="mt-3 ms-auto me-auto">First time logging in? Please <Link to="/register">Register</Link></p>
                </Col>
            </Row>
            {isLoading
            ? <Loading/>
            : <></>}
            {errorMessage
            ? <ErrorCard message={errorMessage}/>
            : <></>}
        </Page>
    );
}

export default Login;