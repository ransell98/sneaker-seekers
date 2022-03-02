import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Col, Image, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import PreviousPageContext from "../contexts/PreviousPageContext";
import { getOneEvent } from "../services/event-api";
import { getTablesByEventId } from "../services/table-api";

import Page from "./Page";
import Loading from "./Loading";
import ErrorCard from "./ErrorCard";
import TableCard from "./TableCard";

function Event() {
    const { id: eventId } = useParams();
    const previousPageContext = useContext(PreviousPageContext);

    const [thisEvent, setThisEvent] = useState();
    const [isEventLoading, setIsEventLoading] = useState(true);
    const [tables, setTables] = useState([]);
    const [isTablesLoading, setIsTablesLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        previousPageContext.setPreviousPage(`/events/${eventId}`);
        fetchEvent();
        fetchTables();
    }, []);

    function fetchEvent() {
        getOneEvent(eventId)
        .then((result) => {
            const newEvent = result;
            newEvent.eventDate = new Date(newEvent.eventDate);
            result = newEvent;
            setThisEvent(result);
        })
        .catch((error) => {
            setErrorMessage(error.toString());
        })
        .finally(() => {
            setIsEventLoading(false);
        });
    }

    function fetchTables() {
        getTablesByEventId(eventId)
        .then((result) => {
            setTables(result);
        })
        .catch((error) => {
            setErrorMessage(error.toString());
        })
        .finally(() => {
            setIsTablesLoading(false);
        })
    }

    function renderEventImage() {
        return (
            <>
                {thisEvent.eventImage
                ? <Image 
                    src={`../${thisEvent.eventImage}`}
                    style={{
                        "maxHeight": "300px", 
                        "maxWidth": "100%"
                    }}
                />
                : <></>}
            </>
        );
    }

    function renderEventLocation() {
        return (
            <div className="mt-4">
                <h3><strong>Location:</strong></h3>
                <h4>{thisEvent.location.locationName}</h4>
                <p>
                    {thisEvent.location.locationAddress}
                    <br/>
                    {thisEvent.location.locationCity}
                </p>
            </div>
        );
    }

    function renderEventDate() {
        return (
            <div className="mt-4">
                <h3><strong>Date:</strong></h3>
                <h4>
                    {thisEvent.eventDate.toLocaleString("default", {weekday: "long"})}{" "}
                    {thisEvent.eventDate.toLocaleString("default", {month: "long"})}{" "}
                    {thisEvent.eventDate.getDate()}{", "}
                    {thisEvent.eventDate.getFullYear()}
                </h4>
            </div>
        )
    }

    function renderTables() {
        return (
            <div className="mt-4 mb-5">
                <h3><strong>Tables:</strong></h3>
                {isTablesLoading
                ? <Loading/>
                : <>
                    <h4>
                        <Row>
                            <Col>
                                Available Tables: {thisEvent.numTable - tables.length}/{thisEvent.numTable}
                            </Col>
                            <Col className="text-end">
                                {thisEvent.numTable - tables.length > 0
                                ? <>
                                    {renderBookTableButton()}
                                </>
                                : <></>}
                            </Col>
                        </Row>
                    </h4>
                    <ul className="ps-0">
                        {tables.sort((a, b) => {
                            return (a.tableNumber - b.tableNumber);
                        }).map((table) => {
                            return (
                                <TableCard
                                    table={table}
                                    key={table.tableId}
                                />
                            );
                        })}
                    </ul>
                </>}
            </div>
        )
    }

    function renderBookTableButton() {
        return (
            <LinkContainer to={`/events/${thisEvent.eventId}/booktable`}>
                <Button
                    className="ms-3"
                    size="lg"
                    variant="primary"
                >
                    Book Table
                    <FontAwesomeIcon 
                        className="ms-2"
                        icon={faCirclePlus}
                    />
                </Button>
            </LinkContainer>
        );
    }
    
    return (
        <Page>
            <h1 className="mt-3 mt-md-5">
                {
                    (isEventLoading || !thisEvent)
                    ? "View Event"
                    : thisEvent.eventName
                }
            </h1>
            {isEventLoading
            ? <Loading/>
            : <>
                {errorMessage
                ? <ErrorCard message={errorMessage}/>
                : <>
                    {renderEventImage()}
                    {renderEventLocation()}
                    {renderEventDate()}
                    {renderTables()}
                </>
                }
            </>
            }
        </Page>
    );
}

export default Event;