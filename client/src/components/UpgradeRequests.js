import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card, Col, Row } from "react-bootstrap";

import AuthContext from "../contexts/AuthContext";
import { getAllUpgradeRequests, acceptUpgradeRequest, deleteUpgradeRequest } from "../services/upgrade-request-api";

import Page from "./Page";
import Loading from "./Loading";
import ErrorCard from "./ErrorCard";

function UpgradeRequests() {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [upgradeRequests, setUpgradeRequests] = useState([]);

    useEffect(() => {
        getAllUpgradeRequests()
        .then((result) => {
            setUpgradeRequests(result);
        })
        .catch((error) => {
            setErrorMessage(error.toString());
        })
        .finally(() => {
            setIsLoading(false);
        })
    }, []);
    
    useEffect(() => {
        if (!authContext.credentials
        || !authContext.credentials.hasAuthority("ADMIN")) {
            redirect();
        }
    }, [authContext]);

    function redirect() {
        navigate("/login");
    }

    function removeRequestFromPage(request) {
        const newUpgradeRequests = [];
        for (let i = 0; i < upgradeRequests.length; i++) {
            if (upgradeRequests[i].upgradeRequestId !== request.upgradeRequestId) {
                newUpgradeRequests.push(upgradeRequests[i]);
            }
        }
        setUpgradeRequests(newUpgradeRequests);
    }

    function handleRejectRequest(request) {
        deleteUpgradeRequest(request.upgradeRequestId)
        .then(() => {
            removeRequestFromPage(request);
        })
        .catch((error) => {
            console.log(error.toString());
        });
    }

    function handleAcceptRequest(request) {
        acceptUpgradeRequest(request)
        .then(() => {
            removeRequestFromPage(request);
        })
        .catch((error) => {
            console.log(error.toString());
        });
    }

    function renderRequestCard(request) {
        return (
            <Card
                className="my-3"
                key={request.upgradeRequestId}
            >
                <Card.Header>
                    User:
                    {" "}
                    <Link to={`/users/${request.appUser.username}`}>
                        {request.appUser.username}
                    </Link>
                </Card.Header>
                <Card.Body>
                    <Row>
                        <Col className="text-end me-5">
                            <Button
                                onClick={() => {
                                    handleRejectRequest(request);
                                }}
                                variant="warning"
                            >
                                Reject Request
                            </Button>
                        </Col>
                        <Col className="text-start ms-5">
                            <Button
                                onClick={() => {
                                    handleAcceptRequest(request);
                                }}
                                variant="primary"
                            >
                                Accept Request
                            </Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        );
    }

    return (
        <Page>
            <h2 className="mt-5">
                Upgrade Requests
            </h2>
            {isLoading
            ? <Loading/>
            :<>
                {errorMessage
                ? <ErrorCard message={errorMessage}/>
                : (upgradeRequests && upgradeRequests.length > 0
                    ? <>
                        {upgradeRequests.map((request) => {
                            return (
                                renderRequestCard(request)
                            );
                        })}
                    </>
                    : <h4 className="text-center mt-5">There are no open requests.</h4>
                )}
            </>}
        </Page>
    );
}

export default UpgradeRequests;