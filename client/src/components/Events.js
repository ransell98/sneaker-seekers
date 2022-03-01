import { useContext, useState, useEffect } from "react";
import { Col, Dropdown, Row } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAlphaAsc, faSortAlphaDesc,  faSortNumericAsc, faSortNumericDesc } from '@fortawesome/free-solid-svg-icons';

import PreviousPageContext from "../contexts/PreviousPageContext";
import { getAllEvents } from "../services/event-api";

import Page from "./Page";
import EventCard from "./EventCard";
import Loading from "./Loading";
import ErrorCard from "./ErrorCard";

//testing only
export const EVENTS = [
    {"eventId": "1",
    "eventName": "Sneaker Seekers Atlanta 2022",
    "eventDate": new Date("2022-03-05"),
    "location": {
        "name": "Atlanta Convention Center",
        "address": "240 Peachtree Street NW Suite 2200",
        "city": "Atlanta",
    },
    "numTable": 50,
    "image": "images/Placeholder.png"},
    {"eventId": "2",
    "eventName": "Sneaker Seekers Austin 2022",
    "eventDate": new Date("2022-04-16"),
    "location": {
        "name": "Austin Convention Center",
        "address": "500 E. Cesar Chavez St.",
        "city": "Austin",
    },
    "numTable": 36,
    "image": "images/Placeholder.png"},
    {"eventId": "3",
    "eventName": "Sneaker Seekers Minneapolis 2022",
    "eventDate": new Date("2022-03-26"),
    "location": {
        "name": "Minneapolis Convention Center",
        "address": "1301 Second Avenue South",
        "city": "Minneapolis",
    },
    "numTable": 72,
    "image": "images/Placeholder.png"},
    {"eventId": "4",
    "eventName": "Sneaker Seekers Denver 2022",
    "eventDate": new Date("2022-04-03"),
    "location": {
        "name": "Denver Convention Center",
        "address": "700 14th St.",
        "city": "Denver",
    },
    "numTable": 47,
    "image": "images/Placeholder.png"},
    {"eventId": "5",
    "eventName": "ShoeCon Atlanta 2022",
    "eventDate": new Date("2022-03-16"),
    "location": {
        "name": "Atlanta Convention Center",
        "address": "240 Peachtree Street NW Suite 2200",
        "city": "Atlanta",
    },
    "numTable": 42,
    "image": "images/Placeholder.png"},
]

function Events() {
    const previousPageContext = useContext(PreviousPageContext);

    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const [events, setEvents] = useState([]);
    const [sortByIndex, setSortByIndex] = useState(0);

    useEffect(() => {
        previousPageContext.setPreviousPage(`/events`);
        fetchEvents();
    }, []);

    function fetchEvents() {
        getAllEvents()
        .then((result) => {
            for (let i = 0; i < result.length; i++) {
                const newEvent = result[i];
                newEvent.eventDate = new Date(newEvent.eventDate);
                result[i] = newEvent;
                console.log(result[i]);
            }
            //console.log(result);
            setEvents(result);
        })
        .catch((error) => {
            //console.log(error);
            setErrorMessage(error.toString());
        })
        .finally(() => {
            setIsLoading(false);
        });
    }

    const SORT_BY_OPTIONS = [
        {"title": "Date Ascending",
        "icon": faSortNumericAsc},
        {"title": "Date Descending",
        "icon": faSortNumericDesc},
        {"title": "Location Ascending",
        "icon": faSortAlphaAsc},
        {"title": "Location Descending",
        "icon": faSortAlphaDesc},
    ]

    function sortFunction(a, b) {
        switch (sortByIndex) {
            case 0:
                return sortByDate(a, b);
            case 1:
                return sortByDate(b, a);
            case 2:
                return sortByLocation(a, b);
            case 3:
                return sortByLocation(b, a);
        }
    }

    function sortByDate(a, b) {
        return a.eventDate - b.eventDate;
    }

    function sortByLocation(a, b) {
        return ("" + a.location.name).localeCompare(b.location.name);
    }

    function renderSortByDropdown() {
        return (
            <Dropdown>
                <Dropdown.Toggle
                    variant="secondary"
                    id="dropdown-sortby"
                >
                    <FontAwesomeIcon
                        icon={SORT_BY_OPTIONS[sortByIndex].icon}
                    />{" "}
                    Sort By: {SORT_BY_OPTIONS[sortByIndex].title}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    {SORT_BY_OPTIONS.map((option, index) => {
                        return (
                            <Dropdown.Item
                                key={option.title}
                                onClick={() => {
                                    setSortByIndex(index);
                                }}
                            >
                                <FontAwesomeIcon icon={option.icon}/>{" "}
                                {option.title}
                            </Dropdown.Item>
                        );
                    })}
                </Dropdown.Menu>
            </Dropdown>
        );
    }

    return (
        <Page>
            <h1 className="mt-3 mt-md-5">Browse Upcoming Events</h1>
            {isLoading
            ? <Loading/>
            : <>
                {errorMessage
                ? <ErrorCard message={errorMessage}/>
                : <>
                    <Row className="w-100 mt-3">
                        <Col
                            md={{offset: 2}}
                        >
                            {renderSortByDropdown()}
                        </Col>
                    </Row>
                    {events.sort(
                        function(a, b) {
                            return sortFunction(a, b)
                        }
                    ).map((event) => {
                        return(
                            <EventCard 
                                event={event} 
                                key={event.eventId}
                            />
                        );
                    })}
                </>}
            </>}
        </Page>
    );
}

export default Events;