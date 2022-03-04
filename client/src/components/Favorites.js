import { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import AuthContext from "../contexts/AuthContext";
import { getAllFavorites } from "../services/favorite-api";

import Page from "./Page";
import SneakerStyleCard from "./SneakerStyleCard";
import Loading from "./Loading";
import ErrorCard from "./ErrorCard";

function Favorites() {
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [styles, setStyles] = useState([]);
    const authContext = useContext(AuthContext);
    const navigate = useNavigate();
    
    useEffect(() => {
        if (authContext.credentials) {
            fetchStyles();
        } else {
            redirect();
        }
    }, [authContext]);

    function fetchStyles() {
        getAllFavorites()
        .then((result) => {
            setStyles(result.map((favorite) => {
                return favorite.style;
            }));
            setIsLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setErrorMessage(error);
            setIsLoading(false);
        })
    }

    function redirect() {
        navigate("/login");
    }
    
    function renderStyles() {
        return (
            <div className="mb-4">
                {styles.map((s) => {
                    return (
                        <SneakerStyleCard 
                            style={s}
                            key={s.styleId}
                            className="mt-4 ms-lg-5"
                            styles={styles}
                            setStyles={setStyles}
                        />
                    );
                })}
            </div>
        );
    }

    return (
        <Page>
            <h3 className="mt-3 mt-md-5">My Favorites</h3>
            {isLoading
            ? <Loading/>
            : <>
                {errorMessage
                ? <ErrorCard message={errorMessage}/>
                : <>
                    {styles && styles.length > 0
                    ? <>
                        {renderStyles()}
                    </>
                    : <h4 className="text-center mt-5">You have no favorite sneaker styles!</h4>}
                </>}
            </>}
        </Page>
    );
}

export default Favorites;