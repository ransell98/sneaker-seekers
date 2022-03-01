import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as faBookmarkOutline } from '@fortawesome/free-regular-svg-icons';
import { faBookmark, faSpinner } from '@fortawesome/free-solid-svg-icons';

import "../styles/FollowFavoriteButton.css";

function FollowUnfollowButton({ appUser }) {
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
        console.log("addFollow()");
        return new Promise(() => {
            delay(1000)
            .then(() => {
                setIsFollowed(true);
            })
            .then(() => {
                setIsLoading(false);
            })
        });
    }

    function removeFollow() {
        console.log("removeFollow()");
        return new Promise(() => {
            delay(1000)
            .then(() => {
                setIsFollowed(false);
            })
            .then(() => {
                setIsLoading(false);
            })
        });
    }
    
    //testing only
    function delay(t, v) {
        return new Promise(function(resolve) {
            setTimeout(resolve.bind(null, v), t)
        });
    }

    return (
        <Button
            disabled={isLoading}
            className="follow-unfollow-button"
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
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
    );
}

export default FollowUnfollowButton;