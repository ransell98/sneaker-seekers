import { Link } from "react-router-dom";
import { Card, Col, Image, Row } from "react-bootstrap";

import "../styles/User.css";

import FollowUnfollowButton from "./FollowUnfollowButton";

//testing only
import { DEFAULT_PROFILE_PICTURE } from "./User";

function UserCard({ appUser, follows, setFollows }) {

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
                            <Link to={`/users/${appUser.username}`}>
                                {appUser.firstName && appUser.lastName
                                ? `${appUser.firstName} ${appUser.lastName}`
                                : appUser.username}
                            </Link>
                        </Card.Title>
                        {appUser.firstName && appUser.lastName
                        ? <Card.Text>
                            username: {appUser.username}
                        </Card.Text>
                        : <></>}
                        {appUser.email
                        ? <Card.Text>
                            Email: {appUser.email}
                        </Card.Text>
                        : <></>}
                        <FollowUnfollowButton 
                            appUser={appUser}
                            follows={follows}
                            setFollows={setFollows}
                        />
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
}

export default UserCard;