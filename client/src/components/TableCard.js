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
                            Vendor: {table.app_user.username}
                        </Card.Text>
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
}

export default TableCard;