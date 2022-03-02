import { useContext, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as faBookmarkOutline } from '@fortawesome/free-regular-svg-icons';
import { faBookmark, faSpinner } from '@fortawesome/free-solid-svg-icons';

import "../styles/FollowFavoriteButton.css";

import AuthContext from "../contexts/AuthContext";
import { addFollow as fetchAddFollow, deleteFollow } from "../services/follow-api";

function FollowUnfollowButton({ appUser }) {
    const authContext = useContext(AuthContext);

    const [ isLoading, setIsLoading ] = useState(false);
    const [ isFollowed, setIsFollowed ] = useState(false);
    const [ isHover, setIsHover ] = useState(false);

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
        fetchAddFollow(appUser)
        .then(() => {
            setIsFollowed(true);
        })
        .catch((error) => {
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
        })
        .catch((error) => {
            console.log(error.toString());
        })
        .finally(() => {
            setIsLoading(false);
        });
    }
    
    //testing only
    function delay(t, v) {
        return new Promise(function(resolve) {
            setTimeout(resolve.bind(null, v), t)
        });
    }

    return (
        <>
            {authContext.credentials
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