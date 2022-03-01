import { Card, Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import "../styles/EventCard.css";

function EventCard({ event }) {
    return (
        <LinkContainer to={`/events/${event.eventId}`}>
            <Card bg="light" className="event-card">
                <Row>
                    {event.eventImage
                    ? <Col md={4} className="px-md-0">
                        <Card.Img src={event.eventImage}/>
                    </Col>
                    : <></>}
                    <Col
                        className={event.eventImage ? "ps-md-0" : ""}
                    >
                        <Card.Header>
                            {event.eventName}
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Card.Title>
                                        {event.eventDate.toLocaleString("default", {weekday: "long"})}{" "}
                                        {event.eventDate.toLocaleString("default", {month: "long"})}{" "}
                                        {event.eventDate.getDate()}{", "}
                                        {event.eventDate.getFullYear()}
                                    </Card.Title>
                                </Col>
                                <Col>
                                    <Card.Text>
                                        {event.location.locationName}
                                        <br/>
                                        {event.location.locationAddress}
                                        <br/>
                                        {event.location.locationCity}
                                    </Card.Text>
                                </Col>
                            </Row>
                        </Card.Body>
                    </Col>
                </Row>
            </Card>
        </LinkContainer>
    );
}

export default EventCard;