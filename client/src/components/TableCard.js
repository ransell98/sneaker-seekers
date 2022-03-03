import { useContext } from "react";
import { Link } from "react-router-dom";
import { Accordion, Button, Card, Col, Image, Row } from "react-bootstrap";
/*import { LinkContainer } from "react-router-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';
*/
import "../styles/TableCard.css";

import AuthContext from "../contexts/AuthContext";

import SneakerInfo from "./SneakerInfo";
import FollowUnfollowButton from "./FollowUnfollowButton";

import { DEFAULT_PROFILE_PICTURE } from "./User";

function TableCard({ table }) {
    const authContext = useContext(AuthContext);

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

    /*function renderEditTableButton() {
        return (
            <>{authContext.credentials
                && (authContext.credentials.username == table.appUser.username)
                ? <LinkContainer to={`/tables/${table.tableId}`}>
                    <Button
                        className="edit-table-button"
                        size="sm"
                        variant="warning"
                    >
                        <Row>
                            <Col xs={8}>
                                Edit Table
                            </Col>
                            <Col xs={2}>
                                <FontAwesomeIcon
                                    icon={faPencil}
                                />
                            </Col>
                        </Row>
                    </Button>
                </LinkContainer>
                : <></>
            }</>
        );
    }*/
    
    function renderListingsAccordion(listings) {
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
                                {/*renderEditTableButton()*/}
                            </Col>
                            <Col xs={3} className="text-end pt-2">
                                Table {table.tableNumber}
                            </Col>
                        </Row>
                    </Card.Header>
                    <Card.Body>
                        {renderListingsAccordion(table.listings)}
                    </Card.Body>
                </Col>
            </Row>
        </Card>
    );
}

export default TableCard;