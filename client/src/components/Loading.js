import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotate } from '@fortawesome/free-solid-svg-icons';

function Loading() {
    return (
        <h2 className="text-center mt-5">
            Loading...
            <FontAwesomeIcon 
                icon={faRotate} 
                spin
                className="ms-5"
            />
        </h2>
    );
}

export default Loading;