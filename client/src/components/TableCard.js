import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Accordion, Card, Col, Image, Row } from "react-bootstrap";

import "../styles/TableCard.css";

import AuthContext from "../contexts/AuthContext";
import { getListingsByTable } from "../services/listing-api";

import SneakerInfo from "./SneakerInfo";
import FollowUnfollowButton from "./FollowUnfollowButton";

import { DEFAULT_PROFILE_PICTURE } from "./User";

function TableCard({ table }) {
    const authContext = useContext(AuthContext);
    const [listings, setListings] = useState([]);

    useEffect(() => {
        getListingsByTable(table)
        .then((result) => {
            setListings(result);
        })
        .catch((error) => {
            console.log(error.toString());
        });
    }, []);

    function renderProfilePicture(appUser) {
        let profilePicture = DEFAULT_PROFILE_PICTURE;
        if (appUser.profilePicture) {
            profilePicture = appUser.profilePicture;
        }
        return (
            <Image 
                roundedCircle
                src={profilePicture}
                height={30}
            />
        );
    }

    function renderListingsAccordion() {
        return (
            <>
                {listings && listings.length > 0
                ? <Accordion>
                    {listings.map((listing) => {
                        return (
                            <Accordion.Item
                                eventKey={listing.listingId}
                                key={listing.listingId}
                            >
                                <Accordion.Header>
                                    <Row className="w-100">
                                        <Col xs={12} md={5}>
                                            {listing.style.styleName}
                                        </Col>
                                        <Col xs={12} md={4}>
                                            Condition: {listing.listingCondition.conditionName}
                                        </Col>
                                        <Col xs={12} md={3}>
                                            Quantity: {listing.quantity}
                                        </Col>
                                    </Row>
                                </Accordion.Header>
                                <Accordion.Body>
                                    <SneakerInfo style={listing.style}/>
                                </Accordion.Body>
                            </Accordion.Item>
                        );
                    })}
                </Accordion>
                : <i>No listings found.</i>}
            </>
        );
    }
    
    return (
        <Card bg="light" className="table-card">
            <Row>
                <Col>
                    <Card.Header className="py-1">
                        <Row>
                            <Col>
                                <Link to={`/users/${table.appUser.username}`}>
                                    {renderProfilePicture(table.appUser)}
                                </Link>
                                {" "}
                                <Link to={`/users/${table.appUser.username}`}>
                                    {
                                        table.appUser.firstName && table.appUser.lastName
                                        ? <>
                                            {table.appUser.firstName}
                                            {" "}
                                            {table.appUser.lastName}
                                        </>
                                        : table.appUser.username
                                    }
                                </Link>
                                {" "}
                                <FollowUnfollowButton appUser={table.appUser}/>
                            </Col>
                            <Col xs={3} className="text-end pt-2">
                                Table {table.tableNumber}
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        {renderListingsAccordion()}
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
}

export default TableCard;