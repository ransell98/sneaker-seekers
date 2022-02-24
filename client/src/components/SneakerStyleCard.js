import { Button, Card, Col, Row } from "react-bootstrap";

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
                <Col xs={12} md={{span: 3, order: 2}}>
                    <Card.Img src={style.image}/>
                </Col>
                <Col>
                    <h3>
                        {style.style_name}
                    </h3>
                    <Row>
                        <Col xs={12} md={5}>
                            {renderAddToFavoritesButton()}
                            <div>
                                <strong>
                                    Brand:{" "}
                                </strong>
                                <span className="text-nowrap">
                                    {style.brand.brand_name}
                                </span>
                            </div>
                            <div>
                                <strong>
                                    Release Date:{" "}
                                </strong>
                                {style.release_date}
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
        </Card>
    );
}

export default SneakerStyleCard;