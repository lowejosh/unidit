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

    const [selectedItem, setSelectedItem] = useState(0);
    const [changingSel, setChangingSel] = useState(false);

    const sideItem = (top, bottom, selected, name, i) => {
            let classNames = "px-3 pointer py-2 w-100";
            if (top) {
                // classNames+=" rounded-top";
            } else if (bottom) {
                // classNames+=" rounded-bottom";
            }

            if (selected) {
                classNames+=" side-item-sel-alt";
            } else {
                classNames+=" border background-light-background side-item";
            }

            return (
                <div onClick={() => {setSelectedItem(i); setChangingSel(true); setLoading(true)}} className={classNames}>
                    {name}
                </div>
            );
    }
        let sideList = ["All", "Science, Engineering & Information Technology", "Business, Economics & Law", "Health & Behavioural Science", "Humanities & Social Science", "Medicine"];
        let sideListComponents = [];
        for (let i = 0; i < sideList.length; i++) {
            if (i == 0) {
                // sideListComponents.push(<SideItem key={i} top={true} selected={localStorage.getItem("currentState") == sideList[i]} name={sideList[i]} />);
                sideListComponents.push(sideItem(true, false, (selectedItem == i), sideList[i], i));

            } else if (i !== sideList.length - 1) {
                // sideListComponents.push(<SideItem key={i} bottom={true} selected={localStorage.getItem("currentState") == sideList[i]} name={sideList[sideList.length]} />);
                sideListComponents.push(sideItem(false, false, selectedItem == i, sideList[i], i));

            } else {
                // sideListComponents.push(<SideItem key={i} selected={localStorage.getItem("currentState") == sideList[i]} name={sideList[i]} />);
                sideListComponents.push(sideItem(false, true, selectedItem == i, sideList[i], i));
            }
        }



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
                <div>
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
                                        <AltCreateReview type={props.type} show={modalShow} onHide={modalClose} uid={props.user.uid} uname={props.user.displayName} categoryid={categoryId}/>
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
                    {sideListComponents}
                    {/* <div className="w-100 row">
                    <div className="col-sm-4">
                        {/* Sidebar */}
                    {/* </div>
                    <div className="col-sm-8"> */}
                        {/* Content */}
                    {/* </div>
                    </div> */}
                </div>

            ) : (
                <Spinner className="spinner" animation="border"/>
            )
        }
        </div>
    )
}

export default Reviews;