import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
                    by {props.uname} {time2TimeAgo(props.date)} <span className="mx-2"> | </span> Last post was {time2TimeAgo(props.lastDate)}
                </div>

            </div>
        </div>
    );
}

const time2TimeAgo = (ts) => {
    // This function computes the delta between the
    // provided timestamp and the current time, then test
    // the delta for predefined ranges.
    var d=new Date();  // Gets the current time
    ts = ts/1000;
    var nowTs = Date.parse(d.toString())/1000; // getTime() returns milliseconds, and we need seconds, hence the Math.floor and division by 1000

    var seconds = nowTs-ts;

    // more that two days
    if (seconds > 2*24*3600) {
       return "a few days ago";
    }
    // a day
    if (seconds > 24*3600) {
       return "yesterday";
    }

    if (seconds > 3600) {
       return "a few hours ago";
    }
    if (seconds > 1800) {
       return "half an hour ago";
    }
    if (seconds > 120) {
       return Math.floor(seconds/60) + " minutes ago";
    }
    if (seconds > 60) {
        return "one minute ago"
    }
    if (seconds < 60) {
        return "less than one minute ago";
    }
}



export default AltThread;