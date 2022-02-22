import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button, Image } from "react-bootstrap";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';

import Page from "./Page";
import Loading from "./Loading";
import ErrorCard from "./ErrorCard";
import TableCard from "./TableCard";
//testing only
import { EVENTS } from "./Events";

//testing only
const TABLES = [
    {"table_id": 1,
    "status": "Booked",
    "event_id": 1,
    "app_user": {
        "app_user_id": 1,
        "username": "alice_in_chains"
    },
    "listings": [

    ]},
    {"table_id": 2,
    "status": "Booked",
    "event_id": 1,
    "app_user": {
        "app_user_id": 2,
        "username": "BobTheSlob99"
    },
    "listings": [

    ]},
    {"table_id": 3,
    "status": "Booked",
    "event_id": 1,
    "app_user": {
        "app_user_id": 3,
        "username": "xmascarol63"
    },
    "listings": [

    ]},
]

function Event() {
    const { id: eventId } = useParams();
    const [thisEvent, setThisEvent] = useState();
    const [isEventLoading, setIsEventLoading] = useState(true);
    const [tables, setTables] = useState([]);
    const [isTablesLoading, setIsTablesLoading] = useState(true);

    useEffect(() => {
        fetchEvent();
        fetchTables();
    }, []);

    function fetchEvent() {
        return new Promise(() => {
            delay(1000)
            .then(() => {
                for (var i = 0; i < EVENTS.length; i++) {
                    if (EVENTS[i].event_id === eventId) {
                        setThisEvent(EVENTS[i]);
                    }
                }
            })
            .then(() => {
                setIsEventLoading(false);
            });
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
                    {thisEvent.event_date.toLocaleString("default", {weekday: "long"})}{" "}
                    {thisEvent.event_date.toLocaleString("default", {month: "long"})}{" "}
                    {thisEvent.event_date.getDate()}{", "}
                    {thisEvent.event_date.getFullYear()}
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
                            Available Tables: {thisEvent.num_table - tables.length}/{thisEvent.num_table}
                            {thisEvent.num_table - tables.length > 0
                            ? <>{renderBookTableButton()}</>
                            : <></>}
                        </h4>
                        <ul className="ps-0">
                            {tables.map((table) => {
                                return (
                                    <TableCard
                                        table={table}
                                        key={table.table_id}
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
                    : thisEvent.event_name
                }
            </h1>
            {isEventLoading
            ? <Loading/>
            : <>
                {thisEvent
                ? <>
                    {renderEventImage()}
                    {renderEventLocation()}
                    {renderEventDate()}
                    {renderTables()}
                </>
                : <ErrorCard message={"Event not found."}/>
                }
            </>
            }
        </Page>
    );
}

export default Event;