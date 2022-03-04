import { useContext, useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons';
import { faHeart, faSpinner } from '@fortawesome/free-solid-svg-icons';

import "../styles/FollowFavoriteButton.css";

import AuthContext from "../contexts/AuthContext";
import { createFavorite, deleteFavorite, findIfExisting } from "../services/favorite-api";

function FavoriteButton({ style, styles, setStyles }) {
    const authContext = useContext(AuthContext);

    const [ isLoading, setIsLoading ] = useState(false);
    const [ isFavorite, setIsFavorite ] = useState(false);
    const [ isHover, setIsHover ] = useState(false);

    useEffect(() => {
        findIfExisting(style.externalStyleId)
        .then((result) => {
            setIsFavorite(result);
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
        if (isFavorite) {
            removeFavorite();
        } else {
            addFavorite();
        }
    }

    function addFavorite() {
        setIsFavorite(true);
        setIsHover(false);
        createFavorite(style)
        .then(() => {
        })
        .catch(() => {
            setIsFavorite(false);
        })
        .finally(setIsLoading(false));
    }

    function removeFavorite() {
        setIsFavorite(false);
        setIsHover(false);
        deleteFavorite(style)
        .then(() => {
            if (styles) {
                const newStyles = [];
                for (let i = 0; i < styles.length; i++) {
                    if (styles[i].externalStyleId !== style.externalStyleId) {
                        newStyles.push(styles[i]);
                    }
                }
                setStyles(newStyles);
            }
        })
        .catch(() => {
            setIsFavorite(true);
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