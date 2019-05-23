import React, {useEffect, useState} from 'react';
import {Spinner, Form, OverlayTrigger, Popover, Button} from 'react-bootstrap';
import AltCreateReview from './../containers/AltCreateReview';
import {catRef} from './../Database';

const Reviews = (props) => {
    const [categoryId, setCategoryId] = useState(null);
    const [loading, setLoading] = useState(true);

    const [loadingName, setLoadingName] = useState(true);
    const [categoryName, setCategoryName] = useState("");

    const [modalShow, setModalShow] = useState(false);
    const modalClose = () => {setModalShow(false)};
    const popover = (
        <Popover id="popover-basic" title="Sorry!">
            You need to be <strong>signed in</strong> to leave a reply.
        </Popover>
    );
    // Check if category has any reviews - if not put no review
    useEffect(() => {
        if (loading) {
            catRef.on("value", (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    if (props.selectedUni == childSnapshot.val().uni) {
                        if (childSnapshot.val().name == props.name) {
                            setCategoryId(childSnapshot.key);
                        }
                    }  
                });
                setLoading(false);
            })

        }
        if (loadingName && !loading) {
            catRef.child(categoryId).once("value", (snapshot) => {
                setCategoryName(snapshot.val().name);
                setLoadingName(false);
            })
        }
    });
    
    // Allow use to leave a rating 

    // If the reviewObjectId doesnt exist, create one and update the average, and put the rating into the ratingList

    // Print the reviewObjects 

    // Clickable review objects list all of the ratings

    console.log(props.user);
    return (
        <div>
        {
            categoryName 
            ? (
                <div className="row w-100 mx-auto" style={{height: "auto"}}>
                    <div className="col-sm-8 text-background background-primary" style={{lineHeight: "2.5rem", height: "2.5rem"}}><a href="/">Forum</a> > <a href={props.route}>{categoryName}</a></div>
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
                                        Write Review
                                    </Button>
                                    <AltCreateReview type={props.type} show={modalShow} onHide={modalClose} uid={props.user.uid} uname={props.user.displayName} />
                                </div>
                            ) : (
                                <OverlayTrigger trigger="focus" placement="bottom" overlay={popover}>
                                    <Button variant="custom-primary w-100 h-100 mb-2 rounded-0" className="alt-custom-primary">
                                        Write Review    
                                    </Button>
                                </OverlayTrigger>
                            )
                        }
                    </div>
                </div>
            ) : (
                <Spinner className="spinner" animation="border"/>
            )
        }
        </div>
    )
}

export default Reviews;