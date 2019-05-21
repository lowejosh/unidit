import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { validate } from '@babel/types';

const AltCategory = (props) => {

    let description;
    if (props.description) {
        description = props.description;
    } else {
        description = <span><span>Threads: 3241</span><span className="mx-2">Messages: 50,232</span></span>
    }

    return (
        <div>
            <div style={{backgroundColor: "#FFFFFF", overflow: "hidden"}} className="primary-color border-left border-right border-bottom ">
            <FontAwesomeIcon style={{width: "2rem", height: "3.6rem", lineHeight: "3.6rem"}} className="mx-3 pb-1 float-left primary-color"  icon={props.icon}/>
                <a href={props.route}><div style={{lineHeight: "2.2rem", height: "1.8rem"}} className="font-weight-bold color-primary">
                    {props.name}
                </div></a>
                <div style={{fontSize: "12px", lineHeight: "1.4rem", height: "1.8rem", color: "black"}}>
                    {description}
                </div>
            </div>
        </div>
    );
}

export default AltCategory;