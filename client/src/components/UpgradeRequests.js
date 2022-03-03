import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Button, Card } from "react-bootstrap";

import AuthContext from "../contexts/AuthContext";
import { getAllUpgradeRequests } from "../services/upgrade-request-api";

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
            console.log(result);
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