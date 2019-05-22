import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AltThread = (props) => {

    return (
        <div>
            <div>
                <div>
                    {props.title}
                </div>
                <div>
                    by {props.uname} on {props.date}  |  Latest post on {props.lastDate}
                </div>

            </div>
            <div>
                <div>

                </div>
                <div>

                </div>
            </div>
        </div>
    );
}

export default AltThread;