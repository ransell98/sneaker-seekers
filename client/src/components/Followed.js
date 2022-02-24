import { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Card } from "react-bootstrap";

import AuthContext from "../contexts/AuthContext";

import Page from "./Page";
import Loading from "./Loading";

//testing only
const USERS = [
    {
        "id": 1,
        "username": "alice_in_chains",
    },
    {
        "id": 2,
        "username": "BobTheSlob99",
    },
    {
        "id": 3,
        "username": "xmascarol63",
    },
]

function Followed() {
    const [isLoading, setIsLoading] = useState(true);
    const [followedUsers, setFollowedUsers] = useState([]);
    const context = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (context.username) {
            fetchFollowedUsers();
        } else {
            redirect();
        }
    }, [context]);

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

    function renderUserCard(user) {
        return (
            <Card>
                <Card.Header>{user.username}</Card.Header>
            </Card>
        );
    }

    function renderFollowedUsers() {
        return (
            <div className="mb-4">
                {followedUsers.map((user) => {
                    return (
                        <>
                            {renderUserCard(user)}
                        </>
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