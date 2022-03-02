import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faCirclePlus, faSpinner } from '@fortawesome/free-solid-svg-icons';

import AuthContext from "../contexts/AuthContext";
import { getOneEvent } from "../services/event-api";
import { addTable } from "../services/table-api";

import Page from "./Page";
import ErrorCard from "./ErrorCard";

function TableForm() {
    const { id: eventId } = useParams();
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();    
    
    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [username, setUsername] = useState("");
    const [appUserId, setAppUserId] = useState(0);
    const [maxTables, setMaxTables] = useState(-1);
    const [eventName, setEventName] = useState("");
    const [chosenTableNumber, setTableNum] = useState(1);

    useEffect(() => {
        if (!authContext.credentials) {
            redirect();
        } else {
            console.log(authContext.credentials);
            setUsername(authContext.credentials.username);
        }
    }, [authContext]);

    function redirect() {
        navigate("/login");
    }

    useEffect(() => {
        fetchEvent();
    }, []);

    function fetchEvent() {
        getOneEvent(eventId)
        .then((result) => {
            setMaxTables(result.numTable);
            setEventName(result.eventName);
        })
        .catch((error) => {
            console.log(error.toString());
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    function onChangeTableNum(event) {
        const attemptedTableNumber = event.target.value;
        if (!attemptedTableNumber) {
            setTableNum(1);
        } else if (attemptedTableNumber > maxTables) {
            setTableNum(maxTables);
        } else {
            setTableNum(event.target.value);
        }
    }

    function handleBookTable(event) {
        event.preventDefault();
        setIsLoading(true);
        const tableObject = {
            event: {
                eventId: eventId
            },
            booked: true,
            tableNumber: chosenTableNumber,
            appUser: authContext.credentials
        }
        addTable(tableObject)
        .then(() => {
            navigate(`/events/${eventId}`);
        })
        .catch((error) => {
            console.log(error);
            setErrorMessage(error.toString());
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    return (
        <Page>
            <LinkContainer to={`/events/${eventId}`}>
                <Button
                    className="mt-5 mb-3"
                    variant="secondary"
                >
                    <FontAwesomeIcon icon={faChevronLeft}/>
                    {" "}
                    Return to Previous Page
                </Button>
            </LinkContainer>
            <h1>
                Book a Table
            </h1>
            <Row>
                <Col xs={12} lg={{span: 6, offset: 3}}>
                    <Card className="mb-3">
                        <Card.Body>
                            <Form onSubmit={handleBookTable}>
                                <Form.Group 
                                    className="mt-1 mb-2"
                                    controlId="formUsername" 
                                >
                                    <Row>
                                        <Col xs={3}>
                                            <Form.Label
                                                className="pt-1"
                                            >
                                                Username:
                                            </Form.Label>
                                        </Col>
                                        <Col xs={9}>
                                            <Form.Control
                                                disabled
                                                required
                                                type="text"
                                                value={username}
                                            />
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <Form.Group 
                                    className="mt-1 mb-2"
                                    controlId="formEventName" 
                                >
                                    <Row>
                                        <Col xs={3}>
                                            <Form.Label
                                                className="pt-1"
                                            >
                                                Event:
                                            </Form.Label>
                                        </Col>
                                        <Col xs={9}>
                                            <Form.Control
                                                disabled
                                                required
                                                type="text"
                                                value={eventName}
                                            />
                                        </Col>
                                    </Row>
                                </Form.Group>
                                <Form.Group 
                                    className="my-2"
                                    controlId="tableNumberInput"
                                >
                                    <Row>
                                        <Col xs={6}>
                                            <Form.Label
                                                className="pt-1 w-100"
                                            >
                                                Table Number:
                                            </Form.Label>
                                        </Col>
                                        <Col xs={6}>
                                            <Form.Control
                                                max={maxTables}
                                                min={0}
                                                onChange={onChangeTableNum}
                                                required
                                                type="number"
                                                value={chosenTableNumber}
                                            />
                                        </Col>
                                    </Row>
                                    <Button
                                        className="mt-3 col-6 offset-3"
                                        disabled={isLoading}
                                        size="lg"
                                        type="submit"
                                        variant="primary"
                                    >
                                        Book Table Now
                                        {" "}
                                        <FontAwesomeIcon 
                                            className="ms-2"
                                            icon={
                                                isLoading
                                                ? faSpinner
                                                : faCirclePlus
                                            }
                                            pulse={isLoading}
                                        />
                                    </Button>
                                </Form.Group>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            {errorMessage
            ? <ErrorCard message={errorMessage}/>
            : <></>}
        </Page>
    );
}

export default TableForm;