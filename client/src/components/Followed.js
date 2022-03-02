import { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import AuthContext from "../contexts/AuthContext";
import { getAllFollowsByUserId } from "../services/follow-api";

import Page from "./Page";
import Loading from "./Loading";
import UserCard from "./UserCard";
import ErrorCard from "./ErrorCard";

function Followed() {
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [follows, setFollows] = useState([]);
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (authContext.credentials) {
            fetchFollowedUsers();
        } else {
            redirect();
        }
    }, [authContext]);

    function fetchFollowedUsers() {
        getAllFollowsByUserId()
        .then((result) => {
            setFollows(result);
        })
        .catch((error) => {
            setErrorMessage(error);
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    function redirect() {
        navigate("/login");
    }

    function renderFollowedUsers() {
        return (
            <div className="mb-4">
                {follows.map((follow) => {
                    return (
                        <UserCard appUser={follow.vendor} key={follow.vendor.id}/>
                    );
                })}
            </div>
        );
    }

    return (
        <Page>
            <h3 className="mt-3 mt-md-5">Vendors I've Followed</h3>
            {isLoading
            ? <Loading/>
            :<>
                {errorMessage
                ? <ErrorCard message={errorMessage}/>
                : follows && follows.length > 0
                    ? <>
                        {renderFollowedUsers()}
                    </>
                    : <h4 className="text-center mt-5">You are not following any vendors!</h4>
                }
            </>}
        </Page>
    );
}

export default Followed;