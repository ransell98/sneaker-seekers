import { useCallback, useContext, useEffect, useState } from "react";
import { Col, Form, Row } from "react-bootstrap";
import _ from "lodash";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

import "../styles/Sneakers.css";

import PreviousPageContext from "../contexts/PreviousPageContext";

import Page from "./Page";
import Loading from "./Loading";
import ErrorCard from "./ErrorCard";
import SneakerStyleCard from "./SneakerStyleCard";

function SearchSneakers() {
    const previousPageContext = useContext(PreviousPageContext);

    const [query, setQuery] = useState("");
    const [styles, setStyles] = useState([]);

    const [isLoading, setIsLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        previousPageContext.setPreviousPage(`/search`);
        const searchBar = document.getElementById("formSearchBar");
        searchBar.focus();
    }, []);

    function noDefaultSubmit (event) {
        event.preventDefault();
    }
    
    function handleChange (event) {
        setIsLoading(true);
        setQuery(event.target.value);
        debounce(event.target.value);
        if (!event.target.value) {
            setErrorMessage("");
            setIsLoading(false);
        }
    }

    const debounce = useCallback(
        _.debounce((_searchVal) => {
            fetchStyles(_searchVal);
        }, 500),
        []
    );

    function fetchStyles(queryToFetch) {
        const count = 10;
        if (queryToFetch) {
            const url = `https://xw7sbct9v6-1.algolianet.com/1/indexes/products/query?x-algolia-application-id=XW7SBCT9V6&x-algolia-api-key=6b5e76b49705eb9f51a06d3c82f7acee`;
            const init = {
                method: "POST",
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/81.0.4044.138 Safari/537.36',
                    "accept": "application/json",
                    "accept-language": "en-US,en;q=0.9",
                    "content-type": "application/x-www-form-urlencoded",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "cross-site"
                },
                body: `{"params":"query=${queryToFetch}&facets=*&filters=product_category:sneakers&hitsPerPage=${count}"}`,
                http2: true
            }
            fetch(url, init)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(response.statusText);
                    }
                    return response.json();
                })
                .then(data => {
                    if (data.hits) {
                        setStyles(data.hits.map((hit) => {
                            return (convertFetchedToStyleObject(hit));
                        }));
                    }
                    setIsLoading(false);
                })
                .catch(exception => {
                    setErrorMessage(exception.message);
                    setIsLoading(false);
                });
        } else {
            setIsLoading(false);
        }
    }

    function convertFetchedToStyleObject(fetched) {
        function getColorway(sourceColorway) {
            const colorwayArray = sourceColorway.split("/");
            if (colorwayArray.length === 3) {
                if (colorwayArray[0] === colorwayArray[1]
                    && colorwayArray[0] === colorwayArray[2]) {
                        return colorwayArray[0];
                    }
            }
            return sourceColorway;
        }
        const styleObject = {
            "externalStyleId": fetched.id,
            "styleName": fetched.name,
            "description": fetched.description,
            //brand: need to link to existing brands
            "brand": {
                "brandName": fetched.brand.replace(/^\w/, (c) => c.toUpperCase()),
            },
            "releaseYear": fetched.release_date,
            "styleImage": fetched.thumbnail_url,
            "colorway": getColorway(fetched.colorway),
        }
        return styleObject;
    }

    function renderSearchBar() {
        return (
            <Form className="mt-4" onSubmit={noDefaultSubmit}>
                <Form.Group controlId="formSearchBar">
                    <Row>
                        <Form.Label column className="text-end">
                            <FontAwesomeIcon icon={faMagnifyingGlass}/>
                        </Form.Label>
                        <Col xs={10} md={11}>
                            <Form.Control
                                type="text"
                                placeholder="Search..."
                                onChange={handleChange}
                                value={query}
                            />
                        </Col>
                    </Row>
                </Form.Group>
            </Form>
        );
    }

    return (
        <Page title="Search Sneakers">
            {renderSearchBar()}
            {isLoading
            ? <Loading/>
            : <>
                {errorMessage
                ? <ErrorCard message={errorMessage}/>
                : <>
                    {query
                    ? <>
                        {styles && styles.length > 0
                        ? <>
                            {styles.map((style) => {
                                return (
                                    <SneakerStyleCard style={style} key={style.style_id}/>
                                );
                            })}
                            <p className="mt-3 text-center">
                                Showing {styles.length} result<span
                                    className={styles.length === 1
                                    ? "d-none"
                                    : ""}
                                >s</span>.
                            </p>
                        </>
                        : <p className="mt-3 text-center">No sneakers found.</p>
                        }
                    </>
                    : <></>
                    }
                </>}
            </>
            }
        </Page>
    );
}

export default SearchSneakers;