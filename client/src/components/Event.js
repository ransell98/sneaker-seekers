import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Image } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import PreviousPageContext from "../contexts/PreviousPageContext";
import { getOneEvent } from "../services/event-api";

import Page from "./Page";
import Loading from "./Loading";
import ErrorCard from "./ErrorCard";
import TableCard from "./TableCard";
//testing only
import { EVENTS } from "./Events";

//testing only
const TABLES = [
    {"tableId": 1,
    "status": "Booked",
    "eventId": 1,
    "appUser": {
        "id": 1,
        "username": "alice_in_chains",
        "profilePicture": "https://upload.wikimedia.org/wikipedia/en/4/43/Alice_In_Chains-Facelift.jpg",
        "firstName": "Alice",
        "lastName": "Abel",
        "email": "alicewithmalice95@gmail.com",
    },
    "listings": [
        {
            "listingId": 1,
            "style": {
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
            "listingPrice": 499.99,
            "listingCondition": {
                "conditionId": 0,
                "conditionName": "Brand New"
            },
            "quantity": 5
        },
        {
            "listingId": 2,
            "style": {
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
            "listingPrice": 299.99,
            "listingCondition": {
                "conditionId": 0,
                "conditionName": "Used"
            },
            "quantity": 2
        },
    ]},
    {"tableId": 2,
    "status": "Booked",
    "eventId": 1,
    "appUser": {
        "id": 2,
        "username": "BobTheSlob99",
        "firstName": "Bob",
        "lastName": "Bartleby",
        "email": "bobtheslob99@yahoo.com",
    },
    "listings": [

    ]},
    {"tableId": 3,
    "status": "Booked",
    "eventId": 1,
    "appUser": {
        "id": 3,
        "username": "xmascarol63",
        "profilePicture": "https://i5.walmartimages.com/asr/00dc2778-e05e-4eeb-8011-baf31ec93b23_1.6346fa6da588f848856fcf511c10ef9f.jpeg",
        "firstName": "Carol",
        "lastName": "Carell",
        "email": "xmascarol63@hotmail.com",
    },
    "listings": [
        {
            "listingId": 3,
            "style": {
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
            "listingPrice": 749.99,
            "listingCondition": {
                "conditionId": 0,
                "conditionName": "New"
            },
            "quantity": 1
        },
        {
            "listingId": 4,
            "style": {
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
            "listingPrice": 45.49,
            "listingCondition": {
                "conditionId": 0,
                "conditionName": "Used"
            },
            "quantity": 33
        },
    ]},
]

function Event() {
    const { id: eventId } = useParams();
    const previousPageContext = useContext(PreviousPageContext);

    const [thisEvent, setThisEvent] = useState();
    const [isEventLoading, setIsEventLoading] = useState(true);
    const [tables, setTables] = useState([]);
    const [isTablesLoading, setIsTablesLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        previousPageContext.setPreviousPage(`/events/${eventId}`);
        fetchEvent();
        fetchTables();
    }, []);

    function fetchEvent() {
        getOneEvent(eventId)
        .then((response) => {
            setThisEvent(response);
        })
        .catch((error) => {
            setErrorMessage(error.toString());
        })
        .finally(() => {
            setIsEventLoading(false);
        })
    }

    function fetchTables() {
        return new Promise(() => {
            delay(3000)
            .then(() => {
                setTables(TABLES);
            })
            .then(() => {
                setIsTablesLoading(false);
            });
        })
    }

    //testing only
    function delay(t, v) {
        return new Promise(function(resolve) {
            setTimeout(resolve.bind(null, v), t)
        });
    }

    function handleBookTable() {
        console.log("handleBookTable");
    }

    function renderEventImage() {
        return (
            <>
                {thisEvent.image
                ? <Image 
                    src={`../${thisEvent.image}`}
                    style={{
                        "maxHeight": "300px", 
                        "maxWidth": "100%"
                    }}
                />
                : <></>}
            </>
        );
    }

    function renderEventLocation() {
        return (
            <div className="mt-4">
                <h3><strong>Location:</strong></h3>
                <h4>{thisEvent.location.name}</h4>
                <p>
                    {thisEvent.location.address}
                    <br/>
                    {thisEvent.location.city}
                </p>
            </div>
        );
    }

    function renderEventDate() {
        return (
            <div className="mt-4">
                <h3><strong>Date:</strong></h3>
                <h4>
                    {thisEvent.eventDate.toLocaleString("default", {weekday: "long"})}{" "}
                    {thisEvent.eventDate.toLocaleString("default", {month: "long"})}{" "}
                    {thisEvent.eventDate.getDate()}{", "}
                    {thisEvent.eventDate.getFullYear()}
                </h4>
            </div>
        )
    }

    function renderTables() {
        return (
            <div className="mt-4 mb-5">
                <h3><strong>Tables:</strong></h3>
                {isTablesLoading
                ? <Loading/>
                : <>
                    {tables && tables.length > 0
                    ? <>
                        <h4>
                            Available Tables: {thisEvent.numTable - tables.length}/{thisEvent.numTable}
                            {thisEvent.numTable - tables.length > 0
                            ? <>{renderBookTableButton()}</>
                            : <></>}
                        </h4>
                        <ul className="ps-0">
                            {tables.map((table) => {
                                return (
                                    <TableCard
                                        table={table}
                                        key={table.tableId}
                                    />
                                );
                            })}
                        </ul>
                    </>
                    : <ErrorCard message={"Problem fetching tables."}/>
                    }
                </>}
            </div>
        )
    }

    function renderBookTableButton() {
        return (
            <Button variant="primary" onClick={handleBookTable} className="ms-3">
                Book Table
                <FontAwesomeIcon 
                    icon={faCirclePlus} 
                    className="ms-2"
                />
            </Button>
        );
    }
    
    return (
        <Page>
            <h1 className="mt-3 mt-md-5">
                {
                    (isEventLoading || !thisEvent)
                    ? "View Event"
                    : thisEvent.eventName
                }
            </h1>
            {isEventLoading
            ? <Loading/>
            : <>
                {errorMessage
                ? <ErrorCard message={errorMessage}/>
                : <>
                    {renderEventImage()}
                    {renderEventLocation()}
                    {renderEventDate()}
                    {renderTables()}
                </>
                }
            </>
            }
        </Page>
    );
}

export default Event;