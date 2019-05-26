import React, {useEffect, useState} from 'react';
import {Spinner, Form, OverlayTrigger, Popover, Button} from 'react-bootstrap';
import AltCreateReview from './../containers/AltCreateReview';
import {catRef, ratingObjRef} from './../Database';
import StarRatings from 'react-star-ratings';

const Reviews = (props) => {
    const [categoryId, setCategoryId] = useState(null);
    const [loading, setLoading] = useState(true);

    const [loadingName, setLoadingName] = useState(true);
    const [categoryName, setCategoryName] = useState("");

    const [hasRatingObj, setHasRatingObj] = useState();
    const [ratingObjList, setRatingObjList] = useState([]);
    const [ratingCount, setRatingCount] = useState();
    const [ratingObjectComponents, setRatingObjectComponents] = useState([]);
    const [loadingRatings, setLoadingRatings] = useState(true);
    const [update, setUpdate] = useState(0);

    const [modalShow, setModalShow] = useState(false);
    const modalClose = () => {setModalShow(false)};
    const popover = (
        <Popover id="popover-basic" title="Sorry!">
            You need to be <strong>signed in</strong> to leave a reply.
        </Popover>
    );

    const [selectedItem, setSelectedItem] = useState(0);
    const [changingSel, setChangingSel] = useState(false);

    let sideList = ["All", "Science, Engineering & Information Technology", "Business, Economics & Law", "Health & Behavioural Science", "Humanities & Social Science", "Medicine"];
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
                <div onClick={() => {setSelectedItem(i); setChangingSel(true)}} className={classNames}>
                    {name}
                </div>
            );
    }
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

        if (changingSel) {
            setRatingObjectComponents([]);
            setRatingObjList([]);
            setLoadingName(true);
            setLoadingRatings(true);
            setChangingSel(false);
        }

        if (loading) {
            catRef.on("value", (snapshot) => {
                snapshot.forEach((childSnapshot) => {
                    if (props.selectedUni == childSnapshot.val().uni) {
                        if (childSnapshot.val().name == props.name) {
                            setCategoryId(childSnapshot.key);
                            setHasRatingObj(childSnapshot.val().hasRatingObject)
                        }
                    }  
                });
                setLoading(false);
            })

        }
        if (loadingName && !loading) {
            catRef.child(categoryId).once("value", (snapshot) => {
                setCategoryName(snapshot.val().name);
                if (snapshot.val().hasRatingObject) {
                    setRatingObjList(Object.values(snapshot.val().ratingObjList));
                }
                setLoadingName(false);
            })
        }

        if (loadingRatings && !loadingName && ratingObjList.length > 0) {
            setRatingCount(ratingObjList.count);
            for (let i = 0; i < ratingObjList.length; i++) {
                // ratingObjectComponents.push(<div>ratingObjList[i]</div>);
                ratingObjRef.child(ratingObjList[i]).once("value", (snapshot) => {
                    let v = snapshot.val();
                    let ratingSum = v.ratingSum;
                    let ratings = v.ratings;
                    let ratingAvg = ratingSum/ratings;
                    let name = v.name;
                    let faculty = v.faculty;
                    let targetId = v.targetId;

                    // if (type == "Major")
                    if (sideList[selectedItem] == "All") {
                        ratingObjectComponents.push(
                            <div key={i} className="w-100 p-3 background-light-background border mt-4">
                                <h5 className="primary-color"><a href={"/ratings" + snapshot.key}>{targetId} - {name}</a><br /><span className="text-darkest-background " style={{fontSize: "16px"}}>{faculty}</span></h5>
                                <div className="py-2 mb-1">Total reviews: {ratings}<br />Average rating: {Math.round(ratingAvg * 100)/100}</div>
                                <StarRatings
                                    rating={ratingAvg}
                                    starRatedColor="#1E2248"
                                    starDimension="30px"
                                    starHoverColor="16122C"
                                    numberOfStars={5}
                                    name='rating'
                                />
                            </div>                        
                        );
                        setUpdate(update + i + 1);
                    } else {
                        if (faculty == sideList[selectedItem]) {
                            ratingObjectComponents.push(
                                <div key={i} className="w-100 p-3 background-light-background border mt-4">
                                    <h5 className="primary-color"><a href={"/ratings" + snapshot.key}>{targetId} - {name}</a><br /><span className="text-darkest-background " style={{fontSize: "16px"}}>{faculty}</span></h5>
                                    <div className="py-2 mb-1">Total reviews: {ratings}<br />Average rating: {ratingAvg}</div>
                                    <StarRatings
                                        rating={ratingAvg}
                                        starRatedColor="#1E2248"
                                        starDimension="30px"
                                        starHoverColor="16122C"
                                        numberOfStars={5}
                                        name='rating'
                                    />
                                </div>                        
                            );
                            setUpdate(update + i + 1);
                        }

                    }
                    setUpdate(update + i + 1);
                })
                if (i == ratingObjList.length - 1) {
                    setLoadingRatings(false);
                }
            }
        }
    }, [loading, loadingName, loadingRatings, changingSel, update, ratingObjectComponents, ]);
    
    return (
        <div>
        {
            categoryName && hasRatingObj !== null
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
                                        <AltCreateReview type={props.type} show={modalShow} onHide={modalClose} uid={props.user.uid} uname={props.user.displayName} categoryid={categoryId} selecteduni={props.selectedUni}/>
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
                    <div>
                    {
                        hasRatingObj
                        ? (
                            <div>
                                {
                                    ratingObjectComponents.length == 1
                                    ? (
                                        <div className="mb-5">
                                            {ratingObjectComponents[0]}
                                        </div>
                                    ) : (
                                        <div className="mb-5">
                                            {ratingObjectComponents}
                                        </div>
                                    )
                                }
                            </div>
                        ) : (
                            <div>
                                <div className="mt-5 text-center">Oops. Looks like there are no reviews yet. Why not leave one?</div>
                            </div>
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