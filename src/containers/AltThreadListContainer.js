import React from 'react';
import AltThread from './../components/AltThread'
import {threadRef} from './../Database';

const AltThreadListContainer = (props) => {


    if (props.hasThreads) {
        threadRef.on("value", (snapshot) => {
            snapshot.forEach((childSnapshot) => {

            });
        })
    } else {
        return (
            <div className="mt-5 text-center">Oops. Looks like there are no threads yet.</div>
        );
    }

    return (
        <div className="mb-4">
            
        </div>
        

    );
}

export default AltThreadListContainer