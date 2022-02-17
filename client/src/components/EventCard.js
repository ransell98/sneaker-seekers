import { Card } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import "../styles/EventCard.css";

function EventCard({ event }) {
    return (
        <LinkContainer to={`/events/:${event.event_id}`}>
            <Card bg="light">
                <Card.Header>
                    {event.event_name}
                </Card.Header>
                <Card.Body>
                    <Card.Title>{event.event_date}</Card.Title>
                    <Card.Text>{event.event_location}</Card.Text>
                </Card.Body>
            </Card>
        </LinkContainer>
    );
}

export default EventCard;