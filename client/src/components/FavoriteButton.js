import { useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons';
import { faHeart, faSpinner } from '@fortawesome/free-solid-svg-icons';

import "../styles/FollowFavoriteButton.css";

function FavoriteButton({ style }) {
    const [ isLoading, setIsLoading ] = useState(false);
    const [ isFavorite, setIsFavorite ] = useState(false);
    const [ isHover, setIsHover ] = useState(false);

    function handleMouseEnter() {
        setIsHover(true);
    }

    function handleMouseLeave() {
        setIsHover(false);
    }

    function handleClick() {
        setIsLoading(true);
        if (isFavorite) {
            removeFavorite();
        } else {
            addFavorite();
        }
    }

    function addFavorite() {
        console.log("addFavorite()");
        return new Promise(() => {
            delay(1000)
            .then(() => {
                setIsFavorite(true);
            })
            .then(() => {
                setIsLoading(false);
            })
        });
    }

    function removeFavorite() {
        console.log("removeFavorite()");
        return new Promise(() => {
            delay(1000)
            .then(() => {
                setIsFavorite(false);
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
            className="favorite-button"
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <Row>
                <Col xs={8}>
                    {
                        isLoading
                        ? "Loading"
                        : "Favorite"
                    }
                </Col>
                <Col xs={2}>
                    <FontAwesomeIcon
                        icon={
                            isLoading
                            ? faSpinner
                            : (
                                isFavorite
                                ? (
                                    isHover
                                    ? faHeartOutline
                                    : faHeart
                                )
                                : (
                                    isHover
                                    ? faHeart
                                    : faHeartOutline
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

export default FavoriteButton;