import React, {useState, useEffect} from 'react';
import {Spinner, Form, OverlayTrigger, Popover, Button} from 'react-bootstrap';
import AltCreateThread from '../containers/AltCreateThread';
import {threadRef, catRef} from './../Database';

const ThreadPage = (props) => {

    const [modalShow, setModalShow] = useState(false);
    const modalClose = () => {setModalShow(false)};
    const [thread, setThread] = useState(null);
    const [threadId, setThreadId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingName, setLoadingName] = useState(true);
    const [categoryName, setCategoryName] = useState("");
    const popover = (
        <Popover id="popover-basic" title="Sorry!">
            You need to be <strong>signed in</strong> to leave a reply.
        </Popover>
    );

    const getTitle = (title) => {
        if (title.length > 30) {
            return title = title.substring(0, 30) + "...";
        } else {
            return title
        }
    }

    useEffect(() => {
        // Get the thread object
        if (loading) {
            threadRef.child(props.id).once("value", (snapshot) => {
                if (snapshot.val() !== null) {
                    setThread(snapshot.val());
                    setThreadId(snapshot.key);
                    setLoading(false);
                } else {
                    setThread(false);
                    setLoading(false);
                }
            });
        }

        if (thread && loadingName) {
            catRef.child(thread.categoryId).once("value", (snapshot) => {
                setCategoryName(snapshot.val().name);
                setLoadingName(false);
            })
        }
    }, [loading])

    // Get category name

    if (thread && categoryName) {
        return (
            <div className="row w-100 mx-auto" style={{height: "auto"}}>
                <div className="col-sm-8 text-background background-primary" style={{lineHeight: "2.5rem", height: "2.5rem"}}><a href="/">Forum</a> > <a href={thread.categoryId}>{categoryName}</a> > <a href={"/thread" + threadId}>{getTitle(thread.title)}</a></div>
                <div className="col-sm-4" style={{padding: "0", margin: "0", height: "2.5rem"}}>
                    {
                        props.user
                        ? (
                            <Button variant="custom-primary w-100 h-100 mb-2 rounded-0 " className="alt-custom-primary" onClick={() => {
                                if (props.user) {
                                    setModalShow(true);
                                } 
                            }}>
                                Leave Reply
                            </Button>
                        ) : (
                            <OverlayTrigger trigger="focus" placement="bottom" overlay={popover}>
                                <Button variant="custom-primary w-100 h-100 mb-2 rounded-0" className="alt-custom-primary">
                                    Leave Reply    
                                </Button>
                            </OverlayTrigger>
                        )
                    }
                    {/* <AltLeaveReply show={modalShow} onHide={modalClose} uid={props.user.uid} uname={props.user.displayName} threadId={threadId}/> */}
                </div>
            </div>
        );
    } else if (thread == false) {
        return  (
            <div>
                <div className="mt-5 text-center">Oops. This thread does not exist.<br/><a href="/">Click here to return home</a></div>
            </div>
        );
    } else {
        return <Spinner className="spinner" animation="border"/>;
    }




}

export default ThreadPage