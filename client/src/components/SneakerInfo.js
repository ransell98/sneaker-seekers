import { Card, Col, Row } from "react-bootstrap";

import "../styles/Sneakers.css";

import FavoriteButton from "./FavoriteButton";
import AddListingButton from "./AddListingButton";

function SneakerInfo({ style, styles, setStyles, hideButtons }) {
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
                        <div>
                            <strong>
                                Brand:{" "}
                            </strong>
                            <span className="text-nowrap">
                                {style.brand.brandName
                                ? style.brand.brandName
                                : ""}
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
                        <Row hidden={hideButtons}>
                            <Col
                                xs={6} md={12} lg={6}
                                className="mx-0 my-md-2"
                            >
                                <FavoriteButton
                                    style={style}
                                    styles={styles}
                                    setStyles={setStyles}/>
                            </Col>
                            <Col
                                xs={6} md={12} lg={6}
                                className="mx-0 my-md-2"
                            >
                                <AddListingButton style={style}/>
                            </Col>
                        </Row>
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