import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import time2Ago from '../utilities/time2Ago';

const AltComment = (props) => {
    return (
        <div className="my-3 p-3 w-100 border background-light-background" >
            <div className="h-100 background-light-background">
                    <div className="primary-color">
                        {props.content}
                    </div>
                    <div className="text-darkest-background">
                        <i>by {props.uname} {time2Ago(props.date)}</i>
                    </div>
            </div>
        </div>
    );
}

export default AltComment;