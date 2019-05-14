import React from 'react';

const Thread = (props) => {
    return (
        <div className="mt-2 mb-3 w-100">
            <div style={{fontSize: "14px"}} className="p-2 w-100 thread-head border rounded-top">
                <a className="primary-color" href="#">{props.user}</a>  posted {props.time} <span className="float-right">{props.topic}</span>
            </div>
            <div className="primary-color thread-text p-3 border rounded-bottom w-100">
                <div style={{fontSize: "17px"}}>
                    {props.title}
                </div>
                <div style={{fontSize: "14px"}}>
                    {props.preview}
                </div>
            </div>
        </div>
    );
}

export default Thread;