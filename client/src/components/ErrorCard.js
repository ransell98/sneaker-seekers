import { Card } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';

import "../styles/ErrorCard.css";

function ErrorCard({ message }) {
    return (
        <Card
            bg="danger"
            text="white"
            className="error-card"
        >
            <Card.Header>
                <FontAwesomeIcon 
                    icon={faTriangleExclamation} 
                    className="me-5"
                />
                Error
                <FontAwesomeIcon 
                    icon={faTriangleExclamation} 
                    className="ms-5"
                />
            </Card.Header>
            <Card.Text>{message}</Card.Text>
        </Card>
    );
}

export default ErrorCard;