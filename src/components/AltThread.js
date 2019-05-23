import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import time2Ago from './../utilities/time2Ago';

const AltThread = (props) => {

    return (
        <div className="my-3 p-3 w-100 border background-light-background" >
            <div className="h-100 background-light-background">
            <a href={props.route}>
                <div className="font-weight-bold color-primary">
                    {props.title}
                </div>
            </a>
                <div className="text-darkest-background">
                    <i>by {props.uname} {time2Ago(props.date)} <span className="mx-2"> | </span> Last post was {time2Ago(props.lastDate)}</i>
                </div>

            </div>
        </div>
    );
}

export default AltThread;