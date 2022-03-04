import { useContext, useEffect } from "react";

import Page from "./Page";

import { Card, Col, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import '../styles/Home.css';

import PreviousPageContext from "../contexts/PreviousPageContext";

function Home() {
    const previousPageContext = useContext(PreviousPageContext);

    useEffect(() => {
        previousPageContext.setPreviousPage(`/`);
    }, []);

    return (
        <Page>
            <h1 className="mt-3 mt-md-5">Welcome to Sneaker Seekers</h1>
            <Row>
                <Col xs={12} lg={6} xl={{span: 5, offset: 1}}>
                    <LinkContainer to="/events">
                        <Card className="page-card mx-3 mt-3 mt-md-5">
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
                        <Card className="page-card mx-3 mt-3 mt-md-5">
                            <h2>
                                Search Sneakers
                            </h2>
                            <Card.Text>
                                Search through a list of thousands of available sneaker styles and keep track of a list of your all-time favorites.
                            </Card.Text>
                        </Card>
                    </LinkContainer>
                </Col>
            </Row>
        </Page>
    );
}

export default Home;