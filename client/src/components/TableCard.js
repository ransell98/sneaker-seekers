import { Link } from "react-router-dom";
import { Card, Col, Row } from "react-bootstrap";

import "../styles/TableCard.css";

function TableCard({ table }) {
    return (
        <Card bg="light" className="table-card">
            <Row>
                <Col>
                    <Card.Header>
                        Table {table.table_id}
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>
                            Vendor:{" "}
                            <Link to={`/users/${table.app_user.id}`}>
                                {table.app_user.username}
                            </Link>
                        </Card.Text>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
}

export default TableCard;