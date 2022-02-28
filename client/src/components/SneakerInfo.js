import { Button, Card, Col, Row } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

import "../styles/Sneakers.css";

function SneakerInfo({ style }) {

    function renderAddToFavoritesButton() {
        return (
            <Button
                onClick={() => console.log("Favorite")}
            >
                Favorite
                <FontAwesomeIcon icon={faHeart}/>
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