import { useState, useEffect } from "react";
import { Button, Col, Form, Image, Row } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import "../styles/Sneakers.css";

import Page from "./Page";
import Loading from "./Loading";

//testing only
const STYLES = [
    {
        "style_id": 1,
        "style_name": "Air Jordan",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci nulla pellentesque dignissim enim sit amet venenatis urna cursus. Lectus quam id leo in vitae turpis.",
        "brand": {
            "brand_id": 1,
            "brand_name": "Nike"
        },
        "release_year": 1985,
        "image": "https://upload.wikimedia.org/wikipedia/commons/d/dc/74892143_f94145facb.jpg"
    },
    {
        "style_id": 2,
        "style_name": "Clown Shoes",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh sit amet commodo nulla facilisi nullam vehicula ipsum. Massa tincidunt dui ut ornare lectus sit.",
        "brand": {
            "brand_id": 2,
            "brand_name": "Barnem & Bailey"
        },
        "release_year": 1886,
        "image": "https://madhattermagicshop.com/magicshop/images/model24b.jpg"
    },
    {
        "style_id": 3,
        "style_name": "New Balance 993 Aimé Leon Dore",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Condimentum lacinia quis vel eros donec. Risus viverra adipiscing at in tellus integer feugiat.",
        "brand": {
            "brand_id": 3,
            "brand_name": "New Balance"
        },
        "release_year": 2021,
        "image": "https://images.stockx.com/images/New-Balance-993-Aime-Leon-Dore-Taupe.jpg"
    },
]

function SearchSneakers() {
    const [query, setQuery] = useState("");
    const [style, setStyle] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        document.getElementById("formSearchBar").focus();
    }, []);

    useEffect(() => {
        fetchStyle();
    }, [query]);

    function fetchStyle() {
        setIsLoading(true);
        setTimeout(() => {
            const index = Math.floor(Math.random() * STYLES.length);
            setStyle(STYLES[index]);
            setIsLoading(false);
        }, 300);
    }

    function renderSearchBar() {
        return (
            <Form className="mt-4">
                <Form.Group controlId="formSearchBar">
                    <Row>
                        <Form.Label column className="text-end">
                            <FontAwesomeIcon icon={faMagnifyingGlass}/>
                        </Form.Label>
                        <Col xs={10} md={11}>
                            <Form.Control
                                type="text"
                                placeholder="Search..."
                                onChange={(event) => setQuery(event.target.value)}
                                value={query}
                            />
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
        );
    }

    function renderStyle() {
        return (
            <div className="sneaker-style mt-4 ms-lg-5">
                <h2>
                    {style.style_name}
                </h2>
                <Row>
                    <Col xs={12} md={{span: 6, order: 2}}>
                        <Image src={style.image}/>
                    </Col>
                    <Col>
                        <h4>
                            Brand: {style.brand.brand_name}
                        </h4>
                        <h4>
                            Release Year: {style.release_year}
                        </h4>
                        <p>
                            {style.description}
                        </p>
                        <Row>
                            <Col xs={{span:4, offset:4}}>
                                {renderAddToFavoritesButton()}
                            </Col>
                        </Row>
                    </Col>
                </Row>
            </div>
        );
    }

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
        <Page title="Search Sneakers">
            {renderSearchBar()}
            {isLoading
            ? <Loading/>
            : <>
                {query
                ? <>
                    {style
                    ? renderStyle()
                    : <p>
                        No sneaker found.
                    </p>
                    }
                </>
                : <></>
                }
            </>
            }
        </Page>
    );
}

export default SearchSneakers;