import { useContext, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons';
import { faHeart, faSpinner } from '@fortawesome/free-solid-svg-icons';

import "../styles/FollowFavoriteButton.css";

import AuthContext from "../contexts/AuthContext";
import { createFavorite, deleteFavorite } from "../services/favorite-api";

function FavoriteButton({ style }) {
    const authContext = useContext(AuthContext);

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
        console.log(style);
        createFavorite(style)
        .then(() => {
            setIsFavorite(true);
        })
        .catch(() => {
        })
        .finally(setIsLoading(false));
    }

    function removeFavorite() {
        deleteFavorite(style)
        .then(() => {
            setIsFavorite(false);
        })
        .catch(() => {

        })
        .finally(setIsLoading(false));
    }
    
    return (
        <>
            {authContext.credentials
            ? <Button
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
            : <></>}
        </>
    );
}

export default FavoriteButton;