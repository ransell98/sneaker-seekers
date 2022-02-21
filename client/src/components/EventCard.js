import { Card, Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import "../styles/EventCard.css";

function EventCard({ event }) {
    return (
        <LinkContainer to={`/events/${event.event_id}`}>
            <Card bg="light" className="event-card">
                <Row>
                    {event.image
                    ? <Col md={4} className="px-md-0">
                        <Card.Img src={event.image}/>
                    </Col>
                    : <></>}
                    <Col
                        className={event.image ? "ps-md-0" : ""}
                    >
                        <Card.Header>
                            {event.event_name}
                        </Card.Header>
                        <Card.Body>
                            <Row>
                                <Col>
                                    <Card.Title>
                                        {event.event_date.toLocaleString("default", {weekday: "long"})}{" "}
                                        {event.event_date.toLocaleString("default", {month: "long"})}{" "}
                                        {event.event_date.getDate()}{", "}
                                        {event.event_date.getFullYear()}
                                    </Card.Title>
                                </Col>
                                <Col>
                                    <Card.Text>
                                        {event.location.name}
                                        <br/>
                                        {event.location.address}
                                        <br/>
                                        {event.location.city}
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