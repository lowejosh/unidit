import React, {useState, useEffect} from 'react';
import AltThread from './../components/AltThread'
import {threadRef} from './../Database';
import { Spinner } from 'react-bootstrap';

const AltThreadListContainer = (props) => {
    const [threads, setThreads] = useState([]);
    const [loading, setLoading] = useState(true);


    // Get all the threads
    useEffect(() => {
        threadRef.once("value", function(snapshot) {
            snapshot.forEach(function(child) {
                let v = child.val();
                if(v.categoryId == props.catId) {
                    threads.push(<AltThread title={v.title}/>);
                }
            })
            setLoading(false);
        })
    }, [loading, threads]);



    if (props.hasThreads) {
        threadRef.on("value", (snapshot) => {
            snapshot.forEach((childSnapshot) => {

            });
        })
    } else if (props.hasThreads == false) {
        return (
            <div>
                <div className="mt-5 text-center">Oops. Looks like there are no threads yet.</div>
            </div>
        );
    } else {
        return <Spinner className="spinner" animation="border"/>;
    }


    console.log(threads);

    return (
        <div className="mb-4">
            {threads}
        </div>
        

    );
}

export default AltThreadListContainer