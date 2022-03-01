import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Col, Form, Row } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import '../styles/LoginAndRegister.css';

import AuthContext from "../contexts/AuthContext";
import PreviousPageContext from "../contexts/PreviousPageContext";
import { createUser } from "../services/user-api";
import { login } from "../services/auth-api";

import Page from "./Page";
import Loading from "./Loading";

function Register() {
    const authContext = useContext(AuthContext);
    const previousPageContext = useContext(PreviousPageContext);
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        firstName: "",
        lastName: ""
    });
    const [isVendor, setIsVendor] = useState(false);

    const [confirmPasswordClass, setConfirmPasswordClass] = useState("form-control");
    
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessages, setErrorMessages] = useState([]);

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

    function onChange(event) {
        const clone = { ...user };
        clone[event.target.id] = event.target.value;
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
                        navigate(previousPageContext.previousPage);
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

    function renderRedAsterisk() {
        return (
            <span className="red-asterisk"> *</span>
        );
    }

    function renderRegisterForm() {
        return (
            <Form onSubmit={onSubmit}>
                <Form.Group controlId="username" className="my-2">
                    <Row>
                        <Col md={3} lg={4} xl={3}>
                            <Form.Label>
                                Username
                                {renderRedAsterisk()}
                            </Form.Label>
                        </Col>
                        <Col xs={10} md={8} lg={7} xl={8}>
                            <Form.Control
                                disabled={isLoading}
                                onChange={onChange}
                                placeholder="Username"
                                required
                                type="text"
                                value={user.username}
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Form.Group controlId="email" className="my-2">
                    <Row>
                        <Col md={3} lg={4} xl={3}>
                            <Form.Label>
                                Email Address
                            </Form.Label>
                        </Col>
                        <Col xs={10} md={8} lg={7} xl={8}>
                            <Form.Control
                                disabled={isLoading}
                                onChange={onChange}
                                placeholder="Email Address"
                                type="text"
                                value={user.email}
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <Row>
                    <Col xs={11}>
                        <Row>
                            <Col xs={10} md={6}>
                                <Form.Group controlId="firstName" className="my-2">
                                    <Row>
                                        <Col md={4}>
                                            <Form.Label>
                                                First Name
                                            </Form.Label>
                                        </Col>
                                        <Col>
                                            <Form.Control
                                                disabled={isLoading}
                                                onChange={onChange}
                                                placeholder="First Name"
                                                type="text"
                                                value={user.firstName}
                                            />
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Col>
                            <Col xs={10} md={6}>
                                <Form.Group controlId="lastName" className="my-2">
                                    <Row>
                                        <Col md={4}>
                                            <Form.Label>
                                                Last Name
                                            </Form.Label>
                                        </Col>
                                        <Col >
                                            <Form.Control
                                                disabled={isLoading}
                                                onChange={onChange}
                                                placeholder="Last Name"
                                                type="text"
                                                value={user.lastName}
                                            />
                                        </Col>
                                    </Row>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                <Form.Group controlId="password" className="my-2">
                    <Row>
                        <Col md={3} lg={4} xl={3}>
                            <Form.Label>
                                Password
                                {renderRedAsterisk()}
                            </Form.Label>
                        </Col>
                        <Col xs={10} md={8} lg={7} xl={8}>
                            <Form.Control
                                disabled={isLoading}
                                onChange={onChange}
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
                <Form.Group controlId="confirmPassword" className="my-2">
                    <Row>
                        <Col md={3} lg={4} xl={3}>
                            <Form.Label>
                                <span className="text-nowrap">
                                    Confirm Password
                                    {renderRedAsterisk()}
                                </span>
                            </Form.Label>
                        </Col>
                        <Col xs={10} md={8} lg={7} xl={8}>
                            <Form.Control
                                className={confirmPasswordClass}
                                disabled={isLoading}
                                onChange={onChange}
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
                <div
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
                </div>
                <Form.Group controlId="vendorCheckbox" className="my-2">
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
                <Col lg={3} className="register-paragraph-column">
                    <h1 className="mt-3 mt-md-5">Register</h1>
                    <p className="mt-3 mt-md-5">
                        Create an account today to keep track of your favorite sneakers and followed vendors.
                    </p>
                    <p>
                        Become a vendor to book a table at a nearby event and start selling your sneakers.
                    </p>
                </Col>
                <Col xs={12} lg={{span: 9, offset: 0}}>
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