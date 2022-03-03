import { useContext, useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button, Card, Col, ButtonGroup, Dropdown, DropdownButton, Form, Row } from "react-bootstrap";

import AuthContext from "../contexts/AuthContext";
import SelectedStyleContext from "../contexts/SelectedStyleContext";
import { getTablesByUser } from "../services/table-api";
import { addListing } from "../services/listing-api";
import { getAllConditions } from "../services/condition-api";

import Page from "./Page";
import Loading from "./Loading";
import ErrorCard from "./ErrorCard";
import SneakerInfo from "./SneakerInfo";

function AddListing() {
    const authContext = useContext(AuthContext);
    const selStyleContext = useContext(SelectedStyleContext);
    const navigate = useNavigate();

    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const [tables, setTables] = useState([]);
    const [conditions, setConditions] = useState([]);

    const [table, setTable] = useState();
    const [listingPrice, setListingPrice] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [listingCondition, setListingCondition] = useState();

    useEffect(() => {
        if (!(
                authContext.credentials
                && authContext.credentials.hasAuthority("VENDOR")
            )) {
            redirect();
        }
    }, [authContext]);

    function redirect() {
        navigate("/login");
    }

    useEffect(() => {
        getTablesByUser()
        .then((result) => {
            setTables(result);
        })
        .catch((error) => {
            setErrorMessage(error.toString());
        })
        .finally(() => {
            setIsLoading(false);
        });

        getAllConditions()
        .then((result) => {
            setConditions(result);
        })
        .catch((error) => {
            setErrorMessage(error.toString());
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, []);

    function handleTableChange(table) {
        setTable(table);
    }

    function handlePriceChange(event) {
        setListingPrice(event.target.value);
    }

    function handleQuantityChange(event) {
        setQuantity(event.target.value);
    }

    function handleConditionChange(condition) {
        setListingCondition(condition);
    }

    function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        const newListing = {
            style: selStyleContext.selectedStyle,
            listingPrice: listingPrice,
            listingCondition: listingCondition,
            quantity: quantity,
            table: table
        }
        addListing(newListing)
        .then((result) => {
            console.log(result);
        })
        .catch((error) => {
            setErrorMessage(error.toString());
        })
        .finally(() => {
            setIsLoading(false);
        })
    }

    return (
        <Page>
            <h2 className="mt-5">
                Add Style to Table
            </h2>
            <Row>
                <Col
                    xs={12} lg={{span: 8, offset: 2}}
                >
                    <Card className="mb-3">
                        <div className="px-2">
                            <SneakerInfo 
                                style={selStyleContext.selectedStyle}
                                hideButtons
                            />
                        </div>
                        <hr/>
                        <Form onSubmit={handleSubmit}>
                            <Row className="mt-1 mb-2 pe-3">
                                <Col xs={3}>
                                    <Form.Label
                                        className="pt-1 ps-3 pt-2 mb-0"
                                    >
                                        Event:
                                    </Form.Label>
                                </Col>
                                <Col xs={9}>
                                    <DropdownButton
                                        as={ButtonGroup}
                                        className="w-100"
                                        disabled={isLoading}
                                        title={
                                            tables
                                            ? (
                                                table
                                                ? table.event.eventName
                                                : `Choose Event`
                                            )
                                            : `Loading...`
                                        }
                                        variant="secondary"
                                    >
                                        {tables
                                        ? <>{tables.map((table) => {
                                            return (
                                                <Dropdown.Item
                                                    onClick={() => {
                                                        handleTableChange(table);
                                                    }}
                                                >
                                                    {table.event.eventName}
                                                </Dropdown.Item>
                                            );
                                        })}</>
                                        : <></>}
                                    </DropdownButton>
                                </Col>
                            </Row>
                            <Form.Group>
                                <Row className="mt-1 mb-2 pe-3">
                                    <Col xs={3} className="pe-0">
                                        <Form.Label
                                            className="pt-1 ps-3 pt-2 mb-0"
                                        >
                                            <span className="d-none d-md-inline">Listing </span>Price: ($)
                                        </Form.Label>
                                    </Col>
                                    <Col xs={9}>
                                        <Form.Control
                                            disabled={isLoading}
                                            min={0}
                                            onChange={handlePriceChange}
                                            required
                                            step={0.01}
                                            type="number"
                                            value={listingPrice}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Form.Group>
                                <Row className="mt-1 mb-2 pe-3">
                                    <Col xs={3} className="pe-0">
                                        <Form.Label
                                            className="pt-1 ps-3 pt-2 mb-0"
                                        >
                                            Quantity:
                                        </Form.Label>
                                    </Col>
                                    <Col xs={9}>
                                        <Form.Control
                                            disabled={isLoading}
                                            min={1}
                                            onChange={handleQuantityChange}
                                            required
                                            type="number"
                                            value={quantity}
                                        />
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Row className="mt-1 mb-2 pe-3">
                                <Col xs={3}>
                                    <Form.Label
                                        className="pt-1 ps-3 pt-2 mb-0"
                                    >
                                        Condition:
                                    </Form.Label>
                                </Col>
                                <Col xs={9}>
                                    <DropdownButton
                                        as={ButtonGroup}
                                        className="w-100"
                                        disabled={isLoading}
                                        title={
                                            conditions
                                            ? (
                                                listingCondition
                                                ? listingCondition.conditionName
                                                : `Choose Condition`
                                            )
                                            : `Loading...`
                                        }
                                        variant="secondary"
                                    >
                                        {conditions
                                        ? <>{conditions.map((condition) => {
                                            return (
                                                <Dropdown.Item
                                                    onClick={() => {
                                                        handleConditionChange(condition);
                                                    }}
                                                >
                                                    {condition.conditionName}
                                                </Dropdown.Item>
                                            );
                                        })}</>
                                        : <></>}
                                    </DropdownButton>
                                </Col>
                            </Row>
                            <Row>
                                <Button
                                    className="my-3 col-6 offset-3"
                                    disabled={isLoading}
                                    size="lg"
                                    type="submit"
                                    variant="primary"
                                    type="submit"
                                >
                                    Submit New Listing
                                </Button>
                            </Row>
                        </Form>
                    </Card>
                </Col>
            </Row>
            {isLoading
            ? <Loading/>
            : <>
                {errorMessage
                ? <ErrorCard message={errorMessage}/>
                : <></>}
            </>}
        </Page>
    );
}

export default AddListing;