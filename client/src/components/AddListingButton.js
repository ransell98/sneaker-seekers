import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import "../styles/AddListingButton.css";

import AuthContext from "../contexts/AuthContext";
import SelectedStyleContext from "../contexts/SelectedStyleContext";

function AddListingButton({ style }) {
    const authContext = useContext(AuthContext);
    const selStyleContext = useContext(SelectedStyleContext);
    const navigate = useNavigate();

    const [isTableAvailable, setIsTableAvailable] = useState(false);

    useEffect(() => {
        if (authContext.credentials
        && authContext.credentials.hasAuthority("VENDOR")) {
            setIsTableAvailable(true);
        } else {
            setIsTableAvailable(false);
        }
    }, [authContext]);

    function handleClick() {
        selStyleContext.setSelectedStyle(style);
        navigate("/addlisting");
    }

    return (
        <>{isTableAvailable
            ?<Button
                className="add-listing-button"
                onClick={handleClick}
                variant="warning"
            >
                Add to Table
                <FontAwesomeIcon
                    icon={faPlus}
                />
            </Button>
            : <></>
        }</>
    );
}

export default AddListingButton;