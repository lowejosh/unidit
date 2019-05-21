import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const AltCategory = (props) => {
    let description;
    if (props.description) {
        description = props.description;
    } else {
        description = <span><span>Threads: 3241</span><span className="mx-2">Messages: 50,232</span></span>
    }



    return (
        <div>
            <FontAwesomeIcon style={{width: "2rem", height: "3.6rem", lineHeight: "3.6rem"}} className="mx-2 pb-1 float-left primary-color"  icon={props.icon}/>
            <div style={{backgroundColor: "#FFFFFF", paddingLeft: "2.5rem"}} className="thread-text border-left px-4 border-right border-bottom ">
                <div style={{lineHeight: "2.2rem", height: "1.8rem"}} className="font-weight-bold color-primary">
                    {props.name}
                </div>
                <div style={{fontSize: "12px", lineHeight: "1.4rem", height: "1.8rem"}}>
                    {description}
                </div>
            </div>
        </div>
    );
}

export default AltCategory;