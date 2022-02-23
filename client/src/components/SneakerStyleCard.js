import { Button, Card, Col, Image, Row } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

function SneakerStyleCard({ style }) {

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
        <Card
            className="sneaker-style-card 
                        mt-4 ms-lg-5
                        pt-0 pt-md-3
                        ps-3
                        pe-3 pe-md-0
                        pb-3"
        >
            <Row>
                <Col xs={12} md={{span: 4, order: 2}}>
                    <Card.Img src={style.image}/>
                </Col>
                <Col>
                    <h2>
                        {style.style_name}
                    </h2>
                    <Row>
                        <Col xs={12} md={5}>
                            {renderAddToFavoritesButton()}
                            <h4>
                                Brand:{" "}
                                <span className="text-nowrap">
                                    {style.brand.brand_name}
                                </span>
                            </h4>
                            <h4>
                                Release Year: {style.release_year}
                            </h4>
                        </Col>
                        <Col>
                            <Card.Text>
                                {style.description}
                            </Card.Text>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Card>
    );
}

export default SneakerStyleCard;