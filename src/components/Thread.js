import React, {useState} from 'react';
import {userRef} from './../Database';

const Thread = (props) => {
    const [selected, setSelected] = useState(props.sel);

    if (props.variant == "uni") {
        return (
            <div className="mt-2 mb-3 w-100">
                <div style={{fontSize: "14px"}} className="p-2 w-100 thread-head border rounded-top">
                    <span className="primary-color">{props.name}</span> <span className="topic-right float-right">{props.topic}</span>
                </div>
                <div className="primary-color p-3 border w-100">
                    <div style={{fontSize: "15px"}}>
                        {props.units} units
                    </div>
                    <div style={{fontSize: "15px"}}>
                        {props.posts} posts
                    </div>
                </div>
                {
                    selected
                    ? (
                        <div className="background-primary border text-background rounded-bottom w-100 p-2">
                            <div className="text-center" style={{fontSize: "14px"}} >
                                Selected
                            </div>
                        </div>
                    ) : (
                        <div className="uni-select background-dark-background border color-primary rounded-bottom w-100 p-2">
                            <div onClick={() => {
                                localStorage.setItem("selectedUniversity", props.id);
                                if (props.uid) {
                                    userRef.child(props.uid).update({'selectedUni': props.id});
                                }
                                window.location.reload();
                            }}
                            className="text-center" style={{fontSize: "14px"}} >
                                Select
                            </div>
                        </div>
                    )
                }
            </div>
        );
    }


    return (
        <div className="mt-2 mb-3 w-100">
            <div style={{fontSize: "14px"}} className="p-2 w-100 thread-head border rounded-top">
                <a className="primary-color" href="#">{props.user}</a>  posted {props.time} <span className="topic-right float-right">{props.topic}</span>
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