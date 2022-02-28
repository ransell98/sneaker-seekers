import { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faHeart, faSpinner } from '@fortawesome/free-solid-svg-icons';

import "../styles/Sneakers.css";

function SneakerInfo({ style }) {
    const [ isFavoritesButtonLoading, setIsFavoritesButtonLoading ] = useState(false);
    const [ isFavorite, setIsFavorite ] = useState(false);

    function handleFavoritesButton() {
        setIsFavoritesButtonLoading(true);
        if (isFavorite) {
            removeFromFavorites();
        } else {
            addToFavorites();
        }
    }

    function addToFavorites() {
        console.log("addToFavorites()");
        return new Promise(() => {
            delay(1000)
            .then(() => {
                setIsFavorite(true);
            })
            .then(() => {
                setIsFavoritesButtonLoading(false);
            })
        })
    }

    function removeFromFavorites() {
        console.log("removeFromFavorites()");
        return new Promise(() => {
            delay(1000)
            .then(() => {
                setIsFavorite(false);
            })
            .then(() => {
                setIsFavoritesButtonLoading(false);
            })
        })
    }
    
    //testing only
    function delay(t, v) {
        return new Promise(function(resolve) {
            setTimeout(resolve.bind(null, v), t)
        });
    }

    function renderAddToFavoritesButton() {
        return (
            <Button
                onClick={handleFavoritesButton}
            >
                Favorite
                <FontAwesomeIcon
                    icon={
                        isFavoritesButtonLoading
                        ? faSpinner
                        : (
                            isFavorite
                            ? faCheck
                            : faHeart
                        )
                    }
                    pulse={isFavoritesButtonLoading}
                />
            </Button>
        );
    }

    return (
        <Row className="sneaker-style-info">
            <Col xs={12} md={{span: 3, order: 2}}>
                <Card.Img src={style.image}/>
            </Col>
            <Col>
                <h3>
                    {style.styleName}
                </h3>
                <Row>
                    <Col xs={12} md={5}>
                        {renderAddToFavoritesButton()}
                        <div>
                            <strong>
                                Brand:{" "}
                            </strong>
                            <span className="text-nowrap">
                                {style.brand.brandName}
                            </span>
                        </div>
                        <div>
                            <strong>
                                Release Date:{" "}
                            </strong>
                            {style.releaseDate}
                        </div>
                        <div>
                            <strong>
                                Colorway:{" "}
                            </strong>
                            {style.colorway}
                        </div>
                    </Col>
                    <Col>
                        <strong>
                            Description:
                        </strong>
                        {style.description
                        ?<Card.Text
                            dangerouslySetInnerHTML={{ __html: style.description}}
                        />
                        : <Card.Text className="font-italic">
                            No description found.
                        </Card.Text>
                        }
                        
                    </Col>
                </Row>
            </Col>
        </Row>
    );
}

export default SneakerInfo;