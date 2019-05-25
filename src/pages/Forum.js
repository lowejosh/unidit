import React, {useState} from 'react';
import AltCreateThread from './../containers/AltCreateThread';
import {Spinner, Form, OverlayTrigger, Popover, Button} from 'react-bootstrap';
import AltThreadListContainer from '../containers/AltThreadListContainer';
import {catRef} from './../Database';

const Forum = (props) => {
    let categoryId;
    const [hasThreads, setHasThreads] = useState(null);
    const [modalShow, setModalShow] = useState(false);
    const modalClose = () => {setModalShow(false)};
    const popover = (
        <Popover id="popover-basic" title="Sorry!">
            You need to be <strong>signed in</strong> to create a thread.
        </Popover>
    );


    if (props.type !== "global") {
        catRef.on("value", (snapshot) => {
            snapshot.forEach((childSnapshot) => {
                if (props.selectedUni == childSnapshot.val().uni) {
                    if (childSnapshot.val().name == props.name) {
                        categoryId = childSnapshot.key;
                    }
                    if (childSnapshot.val().threadExists == true) {
                        setHasThreads(true);
                    } else if (childSnapshot.val().threadExists == false) {
                        setHasThreads(false);
                    }
                }  
            });
        })
    } else {
        switch (props.name) {
            case "General Discussion":
                categoryId = "general"
                break;
            case "Questions":
                categoryId = "questions"
                break;
            default:
                document.write("database error");
        }
    }
    
    catRef.child(categoryId).once("value", (snapshot) => {
        if (snapshot.val().threadExists == true) {
            setHasThreads(true);
        } else if (snapshot.val().threadExists == false) {
            setHasThreads(false);
        }
    });


    return (
        <div>
            {
                categoryId || (hasThreads == null || hasThreads == undefined)
                ? (
                    <div className="w-100">
                        <div className="row w-100 mx-auto" style={{height: "auto"}}>
                            <div className="col-sm-8 text-background background-primary" style={{lineHeight: "2.5rem", height: "2.5rem"}}><a href="/">Forum</a> > <a href={props.route}>{props.name}</a></div>
                            <div className="col-sm-4" style={{padding: "0", margin: "0", height: "2.5rem"}}>
                                {
                                    props.user
                                    ? (
                                        <div>
                                            <Button variant="custom-primary w-100 h-100 mb-2 rounded-0 " className="alt-custom-primary" onClick={() => {
                                                if (props.user) {
                                                    setModalShow(true);
                                                } 
                                            }}>
                                                Create Thread
                                            </Button>
                                            <AltCreateThread show={modalShow} onHide={modalClose} uid={props.user.uid} uname={props.user.displayName} categoryid={categoryId}/>
                                        </div>
                                    ) : (
                                        <OverlayTrigger trigger="focus" placement="bottom" overlay={popover}>
                                            <Button variant="custom-primary w-100 h-100 mb-2 rounded-0" className="alt-custom-primary">
                                                Create Thread
                                            </Button>
                                        </OverlayTrigger>
                                    )
                                }
                            </div>
                        </div>
                        <Form.Group>
                            <Form.Control style={{margin: "0"}} className="rounded-0 border-bottom border-left border-right h-100 w-100 custom-search" size="md" type="text" placeholder="Search for a thread..." />
                        </Form.Group>
                        <AltThreadListContainer catId={categoryId} selectedUniversity={props.selectedUniversity} hasThreads={hasThreads} />
                    </div>
                ) : (
                    <div>
                        <Spinner className="spinner" animation="border"/>;
                    </div>
                )
            }
        </div>
    );
}

export default Forum