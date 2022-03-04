import { useContext, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as faBookmarkOutline } from '@fortawesome/free-regular-svg-icons';
import { faBookmark, faSpinner } from '@fortawesome/free-solid-svg-icons';

import "../styles/FollowFavoriteButton.css";

import AuthContext from "../contexts/AuthContext";
import { addFollow as fetchAddFollow, deleteFollow, findIfExisting } from "../services/follow-api";

function FollowUnfollowButton({ appUser, follows, setFollows }) {
    const authContext = useContext(AuthContext);

    const [ isLoading, setIsLoading ] = useState(false);
    const [ isFollowed, setIsFollowed ] = useState(false);
    const [ isHover, setIsHover ] = useState(false);

    useEffect(() => {
        findIfExisting(appUser.id)
        .then((result) => {
            setIsFollowed(result);
        })
        .catch((error) => {
            console.log(error.toString());
        });
    }, []);

    function handleMouseEnter() {
        setIsHover(true);
    }

    function handleMouseLeave() {
        setIsHover(false);
    }

    function handleClick() {
        setIsLoading(true);
        if (isFollowed) {
            removeFollow();
        } else {
            addFollow();
        }
    }

    function addFollow() {
        setIsFollowed(true);
        fetchAddFollow(appUser)
        .then((result) => {
            if (follows) {
                setFollows([...follows, result]);
            }
        })
        .catch((error) => {
            setIsFollowed(false);
            console.log(error.toString());
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    function removeFollow() {
        deleteFollow(appUser.id)
        .then (() => {
            setIsFollowed(false);
            if (follows) {
                const newFollows = [];
                for (let i = 0; i < follows.length; i++) {
                    if (follows[i].id !== appUser.id) {
                        newFollows.push(follows[i]);
                    }
                }
                setFollows(newFollows);
            }
        })
        .catch((error) => {
            console.log(error.toString());
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    return (
        <>
            {authContext.credentials
            && authContext.credentials.username !== appUser.username
            ? <Button
                disabled={isLoading}
                className="follow-unfollow-button"
                onClick={handleClick}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                size="sm"
            >
                <Row>
                    <Col xs={8}>
                        {
                            isLoading
                            ? "Loading"
                            : (
                                isFollowed
                                ? (
                                    isHover
                                    ? "Unfollow"
                                    : "Followed"
                                )
                                : "Follow"
                            )
                        }
                    </Col>
                    <Col xs={2}>
                        <FontAwesomeIcon
                            icon={
                                isLoading
                                ? faSpinner
                                : (
                                    isFollowed
                                    ? (
                                        isHover
                                        ? faBookmarkOutline
                                        : faBookmark
                                    )
                                    : (
                                        isHover
                                        ? faBookmark
                                        : faBookmarkOutline
                                    )
                                )
                            }
                            pulse={isLoading}
                        />
                    </Col>
                </Row>
            </Button>
            : <></>}
        </>
    );
}

export default FollowUnfollowButton;