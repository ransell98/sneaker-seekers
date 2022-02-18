import { useState, useEffect } from "react";
import { Col, Dropdown, Row } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortAlphaAsc, faSortAlphaDesc,  faSortNumericAsc, faSortNumericDesc } from '@fortawesome/free-solid-svg-icons';

import Page from "./Page";
import EventCard from "./EventCard";
import Loading from "./Loading";

//testing only
export const EVENTS = [
    {"event_id": "1",
    "event_name": "Sneaker Seekers Atlanta 2022",
    "event_date": new Date("2022-03-05"),
    "location": {
        "name": "Atlanta Convention Center",
        "address": "240 Peachtree Street NW Suite 2200",
        "city": "Atlanta",
    },
    "num_table": 50,
    "image": "images/Placeholder.png"},
    {"event_id": "2",
    "event_name": "Sneaker Seekers Austin 2022",
    "event_date": new Date("2022-04-16"),
    "location": {
        "name": "Austin Convention Center",
        "address": "500 E. Cesar Chavez St.",
        "city": "Austin",
    },
    "num_table": 36,
    "image": "images/Placeholder.png"},
    {"event_id": "3",
    "event_name": "Sneaker Seekers Minneapolis 2022",
    "event_date": new Date("2022-03-26"),
    "location": {
        "name": "Minneapolis Convention Center",
        "address": "1301 Second Avenue South",
        "city": "Minneapolis",
    },
    "num_table": 72,
    "image": "images/Placeholder.png"},
    {"event_id": "4",
    "event_name": "Sneaker Seekers Denver 2022",
    "event_date": new Date("2022-04-03"),
    "location": {
        "name": "Denver Convention Center",
        "address": "700 14th St.",
        "city": "Denver",
    },
    "num_table": 47,
    "image": "images/Placeholder.png"},
    {"event_id": "5",
    "event_name": "ShoeCon Atlanta 2022",
    "event_date": new Date("2022-03-16"),
    "location": {
        "name": "Atlanta Convention Center",
        "address": "240 Peachtree Street NW Suite 2200",
        "city": "Atlanta",
    },
    "num_table": 42,
    "image": "images/Placeholder.png"},
]

function Events() {
    const [isLoading, setIsLoading] = useState(true);
    const [sortByIndex, setSortByIndex] = useState(0);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

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
        return a.event_date - b.event_date;
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
        <Page title="Browse Upcoming Events">
            {isLoading
            ? <Loading/>
            : <>
                <Row className="w-100 mt-3">
                    <Col
                        md={{offset: 2}}
                    >
                        {renderSortByDropdown()}
                    </Col>
                </Row>
                {EVENTS.sort(
                    function(a, b) {
                        return sortFunction(a, b)
                    }
                ).map((event) => {
                    return(
                        <EventCard 
                            event={event} 
                            key={event.event_id}
                        />
                    );
                })}
            </>}
        </Page>
    );
}

export default Events;