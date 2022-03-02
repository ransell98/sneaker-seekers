import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Image } from "react-bootstrap";

import "../styles/User.css";

import PreviousPageContext from "../contexts/PreviousPageContext";
import { getUserByUsername } from "../services/user-api";

import Page from "./Page";
import Loading from "./Loading";
import ErrorCard from "./ErrorCard";
import FollowUnfollowButton from "./FollowUnfollowButton";

export const DEFAULT_PROFILE_PICTURE = "https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg";

//testing only
export const USERS = [
    {
        "id": 1,
        "username": "alice_in_chains",
        "profilePicture": "https://upload.wikimedia.org/wikipedia/en/4/43/Alice_In_Chains-Facelift.jpg",
        "firstName": "Alice",
        "lastName": "Abel",
        "email": "alicewithmalice95@gmail.com",
    },
    {
        "id": 2,
        "username": "BobTheSlob99",
        "firstName": "Bob",
        "lastName": "Bartleby",
        "email": "bobtheslob99@yahoo.com",
    },
    {
        "id": 3,
        "username": "xmascarol63",
        "profilePicture": "https://i5.walmartimages.com/asr/00dc2778-e05e-4eeb-8011-baf31ec93b23_1.6346fa6da588f848856fcf511c10ef9f.jpeg",
        "firstName": "Carol",
        "lastName": "Carell",
        "email": "xmascarol63@hotmail.com",
    }
]

function User() {
    const { username: username } = useParams();
    const previousPageContext = useContext(PreviousPageContext);

    const [ appUser, setAppUser ] = useState();

    const [ isLoading, setIsLoading ] = useState(true);
    const [ errorMessage, setErrorMessage ] = useState("");

    useEffect(() => {
        previousPageContext.setPreviousPage(`/users/${username}`);
        fetchUser();
    }, []);

    function fetchUser() {
        getUserByUsername(username)
        .then((result) => {
            console.log(result);
            setAppUser(result);
        })
        .catch((error) => {
            setErrorMessage(error.toString());
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    function renderProfilePicture() {
        let profilePicture = DEFAULT_PROFILE_PICTURE;
        if (appUser.profilePicture) {
            profilePicture = appUser.profilePicture;
        }
        return (
            <Image 
                roundedCircle
                src={profilePicture}
                height={200}
                className="mt-5"
            />
        );  
    }

    return (
        <Page>
            {isLoading
            ? <Loading className="mt-5"/>
            : <>
                {errorMessage
                ? <ErrorCard message={errorMessage}/>
                : <>
                    {renderProfilePicture()}
                    {appUser.firstName && appUser.lastName
                    ? <h1>
                        {appUser.firstName} {appUser.lastName}
                    </h1>
                    : <></>}
                    <h3>
                        username: {appUser.username}
                    </h3>
                    <p/>
                    {appUser.email
                    ? <p>
                        Email: {appUser.email}
                    </p>
                    : <></>}
                    <FollowUnfollowButton appUser={appUser}/>
                </>}
            </>}
        </Page>
    );
}

export default User;