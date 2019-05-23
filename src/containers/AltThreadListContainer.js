import React, {useState, useEffect} from 'react';
import AltThread from './../components/AltThread'
import {threadRef, catRef} from './../Database';
import { Spinner } from 'react-bootstrap';

const AltThreadListContainer = (props) => {
    const [threads, setThreads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [threadList, setThreadList] = useState([]);


    // Get all the threads
    useEffect(() => {
        catRef.child(props.catId).once("value", function(snapshot) {
            if (snapshot.val().threadList) {
                setThreadList(Object.values(snapshot.val().threadList));
            }
        })

        if (threadList.length > 0 && loading == true) {

            for (let i = 0; i < threadList.length; i++) {
                threadRef.child(threadList[i]).once("value", (snapshot) => {
                    let v = snapshot.val();
                    if(v.categoryId == props.catId) {
                        threads.push(<AltThread key={i} title={v.title} uname={v.posterName} uid={v.posterId} content={v.content} date={v.timeStamp} lastDate={v.lastReplyTimeStamp} route={"/thread" + snapshot.key}/>);
                    }
                })
                if (i == threadList.length - 1) {
                    setLoading(false);
                }
            }
        }
        
        // threadRef.once("value", function(snapshot) {
        //     snapshot.forEach(function(child) {
        //         let v = child.val();
        //         if(v.categoryId == props.catId) {
        //             threads.push(<AltThread title={v.title} uname={v.posterName} uid={v.posterId} content={v.content} date={v.timeStamp} lastDate={v.lastReplyTimeStamp} route={"/thread" + child.key}/>);
        //         }
        //     })
        //     setLoading(false);
        // })
    }, [loading, threadList, threads]);



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

    return (
        <div className="mb-5">
            {threads}
        </div>
    );
}

export default AltThreadListContainer