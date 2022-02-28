import { useContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';

import AuthContext from "../contexts/AuthContext";

import Page from "./Page";
import SneakerStyleCard from "./SneakerStyleCard";
import Loading from "./Loading";

//testing only
const STYLES = [
    {
        "styleId": 1,
        "styleName": "Air Jordan",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Orci nulla pellentesque dignissim enim sit amet venenatis urna cursus. Lectus quam id leo in vitae turpis.",
        "brand": {
            "brandId": 1,
            "brandName": "Nike"
        },
        "releaseDate": 1985,
        "image": "https://upload.wikimedia.org/wikipedia/commons/d/dc/74892143_f94145facb.jpg"
    },
    {
        "styleId": 2,
        "styleName": "Clown Shoes",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh sit amet commodo nulla facilisi nullam vehicula ipsum. Massa tincidunt dui ut ornare lectus sit.",
        "brand": {
            "brandId": 2,
            "brandName": "Barnem & Bailey"
        },
        "releaseDate": 1886,
        "image": "https://madhattermagicshop.com/magicshop/images/model24b.jpg"
    },
    {
        "styleId": 3,
        "styleName": "New Balance 993 Aimé Leon Dore",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Condimentum lacinia quis vel eros donec. Risus viverra adipiscing at in tellus integer feugiat.",
        "brand": {
            "brandId": 3,
            "brandName": "New Balance"
        },
        "releaseDate": 2021,
        "image": "https://images.stockx.com/images/New-Balance-993-Aime-Leon-Dore-Taupe.jpg"
    },
]

function Favorites() {
    const [isLoading, setIsLoading] = useState(true);
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
        return new Promise(() => {
            delay(1000)
            .then(() => {
                setStyles(STYLES);
            })
            .then(() => {
                setIsLoading(false);
            });
        })
    }

    function redirect() {
        navigate("/login");
    }

    //testing only
    function delay(t, v) {
        return new Promise(function(resolve) {
            setTimeout(resolve.bind(null, v), t)
        });
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
                {styles && styles.length > 0
                ? <>
                    {renderStyles()}
                </>
                : <p>You have no favorite styles!</p>}
            </>}
        </Page>
    );
}

export default Favorites;