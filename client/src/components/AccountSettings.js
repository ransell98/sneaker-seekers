import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Form } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleArrowUp, faSpinner, faTrash } from '@fortawesome/free-solid-svg-icons';

import AuthContext from "../contexts/AuthContext";
import { createUpgradeRequest } from "../services/upgrade-request-api";

import Page from "./Page";

function AccountSettings() {
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();    

    const [authorities, setAuthorities] = useState([]);
    const [isUpgradeButtonLoading, setIsUpgradeButtonLoading] = useState(false);

    useEffect(() => {
        if (!authContext.credentials) {
            redirect();
        } else {
            setAuthorities(authContext.credentials.authorities);
        }
    }, [authContext]);

    function redirect() {
        navigate("/login");
    }

    function handleRequestUpgrade() {
        setIsUpgradeButtonLoading(true);
        createUpgradeRequest()
        .then(() => {

        })
        .catch((error) => {
            console.log(error.toString());
        })
        .finally(() => {
            setIsUpgradeButtonLoading(false);
        })
    }

    return (
        <Page>
            <h1 className="mt-3 mt-md-5">Account Settings</h1>
            <hr/>
            <h3>
                User Type:
                {" "}
                {
                    authorities.includes("ADMIN")
                    ? <>
                        Admin
                        {
                            authorities.includes("VENDOR")
                            ? <>, Vendor</>
                            : <></>
                        }
                    </>
                    : (
                        authorities.includes("VENDOR")
                        ? <>Vendor</>
                        : <>User</>
                    )
                }
            </h3>
            <p>Change Username</p>
            <p>Change Password</p>
            <hr/>
            {
                authorities.includes("VENDOR")
                ? <></>
                : <>
                    <Button
                        className="mb-3"
                        disabled={isUpgradeButtonLoading}
                        onClick={handleRequestUpgrade}
                        variant="primary"
                    >
                        <FontAwesomeIcon
                            icon={isUpgradeButtonLoading
                                ? faSpinner
                                : faCircleArrowUp}
                            pulse={isUpgradeButtonLoading}
                        />
                        {" "}
                        Request to Become Vendor
                    </Button>
                    <br/>
                </>
            }
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