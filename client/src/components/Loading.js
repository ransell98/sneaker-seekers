import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

function Loading() {
    return (
        <h2 className="text-center mt-2">
            Loading...
            <FontAwesomeIcon 
                icon={faSpinner} 
                pulse
                className="ms-5"
            />
        </h2>
    );
}

export default Loading;