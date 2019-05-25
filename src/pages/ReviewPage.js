import React, {useState, useEffect} from 'react';
import {Spinner, Form, OverlayTrigger, Popover, Button} from 'react-bootstrap';
import AltLeaveReply from '../containers/AltLeaveReply';
import ReviewList from '../containers/ReviewList';
import AltCommentListContainer from '../containers/AltCommentListContainer';
import {ratingObjRef, catRef} from '../Database';
import StarRatings from 'react-star-ratings';
import time2Ago from '../utilities/time2Ago';

const ReviewPage = (props) => {

    const [review, setReview] = useState(null);
    const [reviewId, setReviewId] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingName, setLoadingName] = useState(true);
    const [categoryName, setCategoryName] = useState(false);
    const [ratingAvg, setRatingAvg] = useState(0);
    const [route, setRoute] = useState("");
    const [ratingList, setRatingList] = useState();

    useEffect(() => {
        // Get the review object
        if (loading) {
            ratingObjRef.child(props.id).once("value", (snapshot) => {
                if (snapshot.val() !== null) {
                    setReview(snapshot.val());
                    setRatingList(Object.values(snapshot.val().ratingList))
                    setReviewId(snapshot.key);
                    setLoading(false);
                } else {
                    setReview(false);
                    setLoading(false);
                }
            });
        }

        if (review && loadingName) {
            setRatingAvg(review.ratingSum / review.ratings);
            catRef.child(review.categoryId).once("value", (snapshot) => {
                setCategoryName(snapshot.val().name);
                if (snapshot.val().name == "Unit Reviews") {
                    setRoute("/unit-reviews");
                } else if (snapshot.val().name == "Course Reviews") {
                    setRoute("/course-reviews");
                } else if (snapshot.val().name == "Major Reviews") {
                    setRoute("/major-reviews");
                }
                setLoadingName(false);
            })
        }
    }, [loading, loadingName, route, ratingList])

    if (review && categoryName) {
        return (
            <div className="w-100 mx-auto" style={{height: "auto"}}>
                {
                    route == "/major-reviews"
                    ? (
                        <div className="text-background background-primary px-3" style={{lineHeight: "2.5rem", height: "2.5rem"}}><a href="/">Forum</a> > <a href={route}>{categoryName}</a> > <a href={"ratings" + props.id}>{review.targetId}</a></div>
                    ) : (
                        <div className="text-background background-primary px-3" style={{lineHeight: "2.5rem", height: "2.5rem"}}><a href="/">Forum</a> > <a href={route}>{categoryName}</a> > <a href={"ratings" + props.id}>{review.name}</a></div>
                    )
                }
                <div className="w-100 background-light-background p-3 border-left border-right border-bottom">
                    <h5 className="primary-color">{review.targetId} - {review.name}<br /><span className="text-darkest-background " style={{fontSize: "16px"}}>{review.faculty}</span></h5>
                    <div className="py-2 mb-1">Total reviews: {review.ratings}<br />Average rating: {ratingAvg}
                        <div className="display-block mt-3">
                            <StarRatings
                                rating={ratingAvg}
                                starRatedColor="#1E2248"
                                starDimension="30px"
                                starHoverColor="16122C"
                                numberOfStars={5}
                                name='rating'
                            />
                        </div>
                    </div>                        
                </div>
                <ReviewList list={ratingList} />
            </div>
        );
    } else if (review == false) {
        return  (
            <div>
                <div className="mt-5 text-center">Oops. This page does not exist.<br/><a href="/">Click here to return home</a></div>
            </div>
        );
    } else {
        return <Spinner className="spinner" animation="border"/>;
    }




}

export default ReviewPage