import { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faHeart, faSpinner } from '@fortawesome/free-solid-svg-icons';

import "../styles/Sneakers.css";

import FavoriteButton from "./FavoriteButton";

function SneakerInfo({ style }) {
    return (
        <Row className="sneaker-style-info">
            <Col xs={12} md={{span: 3, order: 2}}>
                <Card.Img src={style.styleImage}/>
            </Col>
            <Col>
                <h3>
                    {style.styleName}
                </h3>
                <Row>
                    <Col xs={12} md={5}>
                        <FavoriteButton style={style}/>
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
                            {style.releaseYear}
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