import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Row } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faTrash } from '@fortawesome/free-solid-svg-icons';

import AuthContext from "../contexts/AuthContext";

import Page from "./Page";
import Loading from "./Loading";

function DeleteAccount() {
    const [isLoading, setIsLoading] = useState(false);
    
    const context = useContext(AuthContext);
    const navigate = useNavigate();

    function handleDeleteAccount() {
        setIsLoading(true);
        setTimeout(() => {
            context.setUsername("");
            navigate("/");
        }, 1000);
    }

    return (
        <Page>
            <LinkContainer to="/account">
                <Button
                    variant="secondary"
                    className="mt-5 mb-5"
                    disabled={isLoading}
                >
                    <FontAwesomeIcon icon={faChevronLeft}/>
                    {" "}
                    Return to Previous Page
                </Button>
            </LinkContainer>
            <Card>
                <h2 className="mt-5 text-center">
                    Are you sure you want to delete your account?
                </h2>
                <h5 className="mt-4 text-center">
                    This action cannot be undone.
                </h5>
                <Row className="mt-4 mb-5">
                    <LinkContainer to="/account">
                        <Button 
                            variant="secondary"
                            className="col-10 offset-1
                                        col-md-3 offset-md-2
                                        col-lg-2 offset-lg-3"
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                    </LinkContainer>
                    <Button 
                        variant="warning"
                        className="col-10 offset-1 
                                    col-md-3 offset-md-2
                                    col-lg-2 offset-lg-2
                                    mt-4 mt-md-0"
                        disabled={isLoading}
                        onClick={handleDeleteAccount}
                    >
                        <FontAwesomeIcon icon={faTrash}/>
                        {" "}
                        Delete Account
                    </Button>
                </Row>
            </Card>
            {isLoading
            ? <Loading/>
            : <></>}
        </Page>
    );
}

export default DeleteAccount;