import { Card } from "react-bootstrap";

import SneakerInfo from "./SneakerInfo";

function SneakerStyleCard({ style }) {
    return (
        <Card
            className="sneaker-style-card 
                        mt-4
                        pt-0 pt-md-3
                        ps-3
                        pe-3 pe-md-0
                        pb-3"
        >
            <SneakerInfo style={style}/>
        </Card>
    );
}

export default SneakerStyleCard;