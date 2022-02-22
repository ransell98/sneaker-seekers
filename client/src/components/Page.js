import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Fade } from "react-bootstrap";

import PropTypes from "prop-types";

function Page({ children }) {
    const [isFadeIn, setIsFadeIn] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsFadeIn(true);
        }, 100);
    }, []);

    return (
        <Fade in={isFadeIn}>
            <Container>
                {children}
            </Container>
        </Fade>
    );
}

Page.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.element),
        PropTypes.element.isRequired
    ]),
}

export default Page;