import Page from "./Page";

import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import '../styles/Home.css';

function Home() {
    return (
        <Page title="Welcome to Sneaker Seekers">
            <Row>
                <Col xs={12} lg={6} xl={{span: 5, offset: 1}}>
                    <LinkContainer to="/events">
                        <Card className="page-card">
                            <h2>
                                Browse Events
                            </h2>
                            <Card.Text>
                                View a list of upcoming conventions near you. Find location info, view the vendors that will be attending, and make a plan for your greatest sneaker experience.
                            </Card.Text>
                        </Card>
                    </LinkContainer>
                </Col>
                <Col xs={12} lg={6} xl={5}>
                    <LinkContainer to="/search">
                        <Card className="page-card">
                            <h2>
                                Search Sneakers
                            </h2>
                            <Card.Text>
                                Search through a list of thousands of available sneaker styles, filter by brand and other features, and keep track of a list of your all-time favorites.
                            </Card.Text>
                        </Card>
                    </LinkContainer>
                </Col>
            </Row>
        </Page>
    );
}

export default Home;