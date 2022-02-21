import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

import '../styles/LoginAndRegister.css';

import AuthContext from "../contexts/AuthContext";

import Page from "./Page";
import Loading from "./Loading";

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isVendor, setIsVendor] = useState(false);

    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [confirmPasswordClass, setConfirmPasswordClass] = useState("form-control");
    const [isConfirmPasswordDirty, setIsConfirmPasswordDirty] = useState(false);
    
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const context = useContext(AuthContext);
    const navigate = useNavigate();

    function toggleIsPasswordVisible() {
        setIsPasswordVisible(!isPasswordVisible);
    }

    useEffect(() => {
        if (isConfirmPasswordDirty) {
            if (password === confirmPassword) {
                setShowErrorMessage(false);
                setConfirmPasswordClass("is-valid");
            } else {
                setShowErrorMessage(true);
                setConfirmPasswordClass("is-invalid");
            }
        }
    }, [confirmPassword]);

    function onSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            context.setUsername(username);
            navigate("/");
        }, 1000);
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
                                onChange={(event) => {
                                    setPassword(event.target.value);
                                    setIsConfirmPasswordDirty(true);
                                }}
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
                <Form.Group controlId="formConfirmPassword" className="my-4">
                    <Row>
                        <Col md={3}>
                            <Form.Label>
                                <span className="text-nowrap">Confirm Password</span>
                            </Form.Label>
                        </Col>
                        <Col xs={10} md={8}>
                            <Form.Control
                                type={
                                    isPasswordVisible
                                    ? "text"
                                    : "password"
                                }
                                placeholder="Confirm Password"
                                onChange={(event) => setConfirmPassword(event.target.value)}
                                value={confirmPassword}
                                className={confirmPasswordClass}
                                disabled={isLoading}
                                required
                            />
                        </Col>
                    </Row>
                </Form.Group>
                <p 
                    className="passwords-error-message"
                    hidden={showErrorMessage && isConfirmPasswordDirty
                        ? false
                        : true}
                >
                    Passwords do not match.
                </p>
                <Form.Group controlId="formVendorCheckbox" className="my-4">
                    <Form.Check 
                        type="checkbox" 
                        label="I would like to be a vendor (request must be approved by an admin)"
                        onChange={(event) => setIsVendor(event.target.name)}
                        value={isVendor}
                    />
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

    function renderRegisterCard() {
        return(
            <Card className="card-register">
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
        <Page title="Register">
            <Row>
                <Col lg={4} className="register-paragraph-column">
                    <p className="mt-5">
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
        </Page>
    );
}

export default Register;