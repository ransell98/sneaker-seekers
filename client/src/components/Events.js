import { useState, useEffect } from "react";
import { Col, Dropdown, Row } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSort, faSortAlphaAsc, faSortAlphaDesc,  faSortNumericAsc, faSortNumericDesc } from '@fortawesome/free-solid-svg-icons';

import Page from "./Page";
import EventCard from "./EventCard";
import Loading from "./Loading";

const EVENTS = [
    {"event_id": "1",
    "event_name": "Sneaker Seekers Atlanta 2022",
    "event_date": "2022-03-05",
    "event_location": "Atlanta",
    "num_table": 50},
    {"event_id": "2",
    "event_name": "Sneaker Seekers Austin 2022",
    "event_date": "2022-04-16",
    "event_location": "Austin",
    "num_table": 36},
    {"event_id": "3",
    "event_name": "Sneaker Seekers Minneapolis 2022",
    "event_date": "2022-03-26",
    "event_location": "Minneapolis",
    "num_table": 72},
    {"event_id": "4",
    "event_name": "Sneaker Seekers Denver 2022",
    "event_date": "2022-04-03",
    "event_location": "Denver",
    "num_table": 47},
    {"event_id": "5",
    "event_name": "ShoeCon Atlanta 2022",
    "event_date": "2022-03-16",
    "event_location": "Atlanta",
    "num_table": 42},
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
                break;
            case 1:
                return sortByDate(b, a);
                break;
            case 2:
                return sortByLocation(a, b);
                break;
            case 3:
                return sortByLocation(b, a);
                break;
        }
    }

    function sortByDate(a, b) {
        return ("" + a.event_date).localeCompare(b.event_date);
    }

    function sortByLocation(a, b) {
        return ("" + a.event_location).localeCompare(b.event_location);
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
                <Row>
                    <Col
                        md={{offset: 8}}
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