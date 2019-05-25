import React, {useEffect, useState} from 'react';
import {ratingRef} from './../Database';
import StarRatings from 'react-star-ratings';
import time2Ago from '../utilities/time2Ago';

const ReviewList = (props) => {
    let rl = props.list;
    const [loading, setLoading] = useState(true);
    const [ratings, setRatings] = useState([]);
    const [ratingsLength, setRatingsLength] = useState();
    const [isOneRating, setIsOneRating] = useState();
    const [, Update] = useState();

    
    useEffect(()=> {
        if (rl.length > 0 && loading == true) {
                for (let i = rl.length - 1; i > -1; i--) {
                    ratingRef.child(rl[i]).once("value", (snapshot) => {
                        let v = snapshot.val();
                        if(v.threadId == props.threadid) {
                            ratings.push(
                                <div className="w-100 background-light-background p-3 border mt-4">
                                    <h5 className="primary-color font-italic">{v.posterName} says...</h5> 
                                    {v.content}
                                    <div className="py-3">
                                        <StarRatings
                                            rating={v.rating}
                                            starRatedColor="#1E2248"
                                            starDimension="30px"
                                            starHoverColor="16122C"
                                            numberOfStars={5}
                                            name='rating'
                                        />
                                    </div>
                                    <div className="text-darkest-background">
                                        <i>reviewed {time2Ago(v.timeStamp)}</i>
                                    </div>
                                </div>
                            );
                            Update(i);
                        }
                    })
                    if (i == 0) {
                        setRatingsLength(rl.length);
                        if (rl.length == 1) {
                            setIsOneRating(true);
                        }
                        setLoading(false);
                    }
                }
            }
    }, [loading, rl, setRatingsLength, Update]);
    
    return (
        <div>
        {
            !loading
            ? (
                <div className="mb-5">
                    {ratings}
                </div>
            ) : (
                "no"
            )
        }
        </div>
    )
}

export default ReviewList;