import { Card, Col, Image, Row } from "react-bootstrap";

import "../styles/User.css";

import FollowUnfollowButton from "./FollowUnfollowButton";

//testing only
import { DEFAULT_PROFILE_PICTURE } from "./User";

function UserCard({ appUser }) {

    function renderProfilePicture() {
        let profilePicture = DEFAULT_PROFILE_PICTURE;
        if (appUser.profilePicture) {
            profilePicture = appUser.profilePicture;
        }
        return (
            <Image 
                roundedCircle
                src={profilePicture}
                height={150}
                width={150}
            />
        );  
    }

    return (
        <Card className="user-card">
            <Card.Body>
                <Row>
                    <Col xs={12} md={4}>
                        {renderProfilePicture()}
                    </Col>
                    <Col>
                        <Card.Title>
                            {appUser.username}
                        </Card.Title>
                        {appUser.firstName || appUser.lastName
                        ? <Card.Text>
                            Full Name: {appUser.firstName} {appUser.lastName}
                        </Card.Text>
                        : <></>}
                        {appUser.email
                        ? <Card.Text>
                            Email: {appUser.email}
                        </Card.Text>
                        : <></>}
                        <FollowUnfollowButton appUser={appUser}/>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default UserCard;