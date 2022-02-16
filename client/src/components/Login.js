import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Col, Form, Row } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import '../styles/Login.css';

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

    return (
        <Page title="User Login">
            <Form onSubmit={onSubmit}>
                <Form.Group controlId="formUsername" className="mt-5 mb-4">
                    <Row>
                        <Col md={2}>
                            <Form.Label>Username</Form.Label>
                        </Col>
                        <Col xs={10} md={8}>
                            <Form.Control
                                type="email"
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
                        <Col md={2}>
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
                        variant="primary"
                        type="submit"
                        className="col-4 offset-7 col-lg-2 offset-lg-8"
                        disabled={isLoading}
                    >
                        Login
                    </Button>
                </Row>
            </Form>
            {isLoading
            ? <Loading/>
            : <></>}
        </Page>
    );
}

export default Login;