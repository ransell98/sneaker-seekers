import { useParams } from "react-router-dom";

function Event() {
    const { id: eventId } = useParams();

    return (
        <>
            <h1>Event #{eventId}</h1>
        </>
    );
}

export default Event;