import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Image } from "react-bootstrap";

import "../styles/User.css";

import Page from "./Page";
import Loading from "./Loading";
import ErrorCard from "./ErrorCard";

const DEFAULT_PROFILE_PICTURE = "https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg";

//testing only
const USERS = [
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
    const { id: userId } = useParams();
    const [ user, setUser ] = useState();

    const [ isLoading, setIsLoading ] = useState(true);

    useEffect(() => {
        fetchUser();
    }, []);

    function fetchUser() {
        return new Promise(() => {
            delay(2000)
            .then(() => {
                let thisUser = null;
                for (let i = 0; i < USERS.length; i++) {
                    if (USERS[i].id == userId) {
                        thisUser = USERS[i];
                    }
                }
                setUser(thisUser);
            })
            .then(() => {
                setIsLoading(false);
            })
            .catch((error) => console.log);
        })
    }

    //testing only
    function delay(t, v) {
        return new Promise(function(resolve) {
            setTimeout(resolve.bind(null, v), t)
        });
    }

    function renderProfilePicture() {
        let profilePicture = DEFAULT_PROFILE_PICTURE;
        if (user.profilePicture) {
            profilePicture = user.profilePicture;
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
                {user
                ? <>
                    {renderProfilePicture()}
                    <h1>{user.username}</h1>
                    <p>{user.firstName} {user.lastName}</p>
                    <p>{user.email}</p>
                </>
                : <ErrorCard message="User not found."/>}
            </>}
        </Page>
    );
}

export default User;