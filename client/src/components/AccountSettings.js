import { useContext, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

import AuthContext from "../contexts/AuthContext";

import Page from "./Page";

function AccountSettings() {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();    

    useEffect(() => {
        if (!authContext.credentials) {
            redirect();
        }
    }, [authContext]);

    function redirect() {
        navigate("/login");
    }

    return (
        <Page>
            <h1 className="mt-3 mt-md-5">Account Settings</h1>
            <hr/>
            <p>Change Username</p>
            <p>Change Password</p>
            <hr/>
            <p>Become a vendor</p>
            <LinkContainer to="/account/delete">
                <Button variant="warning">
                    <FontAwesomeIcon icon={faTrash}/>
                    {" "}
                    Delete Account
                </Button>
            </LinkContainer>
        </Page>
    );
}

export default AccountSettings;