import { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Card } from "react-bootstrap";

import AuthContext from "../contexts/AuthContext";

import Page from "./Page";
import Loading from "./Loading";
import UserCard from "./UserCard";

//testing only
import { USERS } from "./User";

function Followed() {
    const [isLoading, setIsLoading] = useState(true);
    const [followedUsers, setFollowedUsers] = useState([]);
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
        return new Promise(() => {
            delay(1000)
            .then(() => {
                setFollowedUsers(USERS);
            })
            .then(() => {
                setIsLoading(false);
            });
        })
    }

    function redirect() {
        navigate("/login");
    }

    //testing only
    function delay(t, v) {
        return new Promise(function(resolve) {
            setTimeout(resolve.bind(null, v), t)
        });
    }

    function renderFollowedUsers() {
        return (
            <div className="mb-4">
                {followedUsers.map((user) => {
                    return (
                        <UserCard appUser={user} key={user.id}/>
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
                {followedUsers && followedUsers.length > 0
                ? <>
                    {renderFollowedUsers()}
                </>
                : <p>You have no vendors that you're following!</p>}
            </>}
        </Page>
    );
}

export default Followed;