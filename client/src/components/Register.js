import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import '../styles/LoginAndRegister.css';

import AuthContext from "../contexts/AuthContext";
import { createUser } from "../services/user-api";
import { login } from "../services/auth-api";

import Page from "./Page";
import Loading from "./Loading";

function Register() {
    const [user, setUser] = useState({
        username: "",
        password: "",
        confirmPassword: ""
    });
    const [isVendor, setIsVendor] = useState(false);

    const [confirmPasswordClass, setConfirmPasswordClass] = useState("form-control");
    
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);
    
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    function toggleIsPasswordVisible() {
        setIsPasswordVisible(!isPasswordVisible);
    }

    useEffect(() => {
        const newErrorMessages = [];
        if (user.confirmPassword.length > 0) {
            setConfirmPasswordClass("is-valid");
        } else {
            setConfirmPasswordClass("");
        }
        if (user.password.length > 0) {
            if (user.password.length < 8) {
                newErrorMessages.push("Password must be at least 8 characters long.");
                setConfirmPasswordClass("is-invalid");
            }
            let regex = /[A-Za-z]/;
            if (!regex.test(user.password)) {
                newErrorMessages.push("Password must contain a letter.");
                setConfirmPasswordClass("is-invalid");
            }
            regex = /[0-9]/;
            if (!regex.test(user.password)) {
                newErrorMessages.push("Password must contain a number.");
                setConfirmPasswordClass("is-invalid");
            }
            regex = /\W/;
            if (!regex.test(user.password)) {
                newErrorMessages.push("Password must contain a symbol.");
                setConfirmPasswordClass("is-invalid");
            }
        }
        if (user.password.length > 0
        && user.confirmPassword.length > 0) {
            if (user.password !== user.confirmPassword) {
                newErrorMessages.push("Passwords must match.");
                setConfirmPasswordClass("is-invalid");
            }
        }
        setErrorMessages(newErrorMessages);
    }, [user.password, user.confirmPassword]);

    function setUsername(event) {
        const clone = { ...user };
        clone["username"] = event.target.value;
        setUser(clone);
    }

    function setPassword(event) {
        const clone = { ...user };
        clone["password"] = event.target.value;
        setUser(clone);
    }

    function setConfirmPassword(event) {
        const clone = { ...user };
        clone["confirmPassword"] = event.target.value;
        setUser(clone);
    }

    function addErrorMessage(message) {
        const clone = [ ...errorMessages ];
        clone.push(message);
        setErrorMessages(clone);
    }

    function clearErrorMessages() {
        setErrorMessages([]);
    }

    function onSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        clearErrorMessages();
        createUser(user)
            .then(() => {
                login(user)
                    .then(principal => {
                        authContext.login(principal);
                        if (isVendor) {
                            //create request to become vendor
                        }
                        navigate("/");
                    })
                    .catch(() => {
                        setIsLoading(false);
                        addErrorMessage("Login failed.");
                    });
            })
            .catch(error => {
                setIsLoading(false);
                if (error.status === 400) {
                    const messages = error.messages.map((message) => {
                        return (
                            message.replace(/^\w/, (c) => c.toUpperCase()) + "."
                        );
                    })
                    setErrorMessages(messages);
                } else {
                    addErrorMessage(error.toString());
                }
            })
    }

    function renderRegisterForm() {
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
                                value={user.username}
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
                                value={user.password}
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
                <Form.Group controlId="formConfirmPassword" className="my-4">
                    <Row>
                        <Col md={3}>
                            <Form.Label>
                                <span className="text-nowrap">Confirm Password</span>
                            </Form.Label>
                        </Col>
                        <Col xs={10} md={8}>
                            <Form.Control
                                className={confirmPasswordClass}
                                disabled={isLoading}
                                onChange={setConfirmPassword}
                                placeholder="Confirm Password"
                                type={
                                    isPasswordVisible
                                    ? "text"
                                    : "password"
                                }
                                required
                                value={user.confirmPassword}
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group
                    className="register-error-messages"
                    hidden={errorMessages.length === 0}
                >
                    {errorMessages.map((message) => {
                        return (
                            <Form.Text key={message}>
                                {message}<br/>
                            </Form.Text>
                        );
                    })}
                </Form.Group>
                <Form.Group controlId="formVendorCheckbox" className="my-4">
                    <Form.Check 
                        label="I would like to be a vendor (must be approved by an admin)"
                        onChange={(event) => setIsVendor(event.target.name)}
                        type="checkbox" 
                        value={isVendor}
                    />
                </Form.Group>
                <Row>
                    <Button
                        className="col-4 offset-4"
                        disabled={isLoading}
                        type="submit"
                        variant="primary"
                    >
                        Register
                    </Button>
                </Row>
            </Form>
        );
    }

    function renderRegisterCard() {
        return(
            <Card className="card-register mt-2 mt-md-5 mb-3">
                <Card.Body>
                    <h3>
                        Get Started Today for Free
                    </h3>
                    <Card.Text>
                        Already have an account?{" "}
                        <Link to="/login">
                            Sign In
                        </Link>
                    </Card.Text>
                    {renderRegisterForm()}
                </Card.Body>
            </Card>
        );
    }

    return (
        <Page>
            <Row>
                <Col lg={4} className="register-paragraph-column">
                    <h1 className="mt-3 mt-md-5">Register</h1>
                    <p className="mt-3 mt-md-5">
                        Create an account today to keep track of your favorite sneakers and followed vendors.
                    </p>
                    <p>
                        Become a vendor to book a table at a nearby event and start selling your sneakers.
                    </p>
                </Col>
                <Col xs={12} lg={{span: 7, offset: 1}}>
                    {renderRegisterCard()}
                </Col>
            </Row>
            {isLoading
            ? <Loading/>
            : <></>}
            {errorMessages
            ? <>
                {errorMessages.map(() => {
                    return
                })}
            </>
            : <></>}
        </Page>
    );
}

export default Register;