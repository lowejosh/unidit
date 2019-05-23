import React, {useState, useEffect} from 'react';
import AltComment from '../components/AltComment';
import {threadRef, commentRef} from '../Database';
import { Spinner } from 'react-bootstrap';

const AltCommentListContainer = (props) => {
    const [comments, setComments] = useState([]);
    const [commentsLength, setCommentsLength] = useState(0);
    const [isOneComment, setIsOneComment] = useState(false);
    const [loading, setLoading] = useState(true);
    const [commentList, setCommentList] = useState([]);
    const [loadingCommentList, setLoadingCommentList] = useState([]);
    const [, Update] = useState();


    // Get all the comments
    useEffect(() => {
        if (loadingCommentList) {
            threadRef.child(props.threadid).once("value", function(snapshot) {
                if (snapshot.val().commentList) {
                    setCommentList(Object.values(snapshot.val().commentList));
                }
                setLoadingCommentList(false);
            })
        }

        if (commentList.length > 0 && loading == true) {

            for (let i = 0; i < commentList.length; i++) {
                commentRef.child(commentList[i]).once("value", (snapshot) => {
                    let v = snapshot.val();
                    console.log(v.threadId + " : " + props.threadid);
                    if(v.threadId == props.threadid) {
                        console.log("REEEEEEEEEEEEE");
                        comments.push(<AltComment key={i} uname={v.posterName} uid={v.posterId} content={v.content} date={v.timeStamp} />);
                        Update(i);
                    }
                })
                if (i == commentList.length - 1) {
                    setCommentsLength(commentList.length);
                    if (commentList.length == 1) {
                        setIsOneComment(true);
                    }
                    setLoading(false);
                }
            }
        }
    }, [loading, commentList, setCommentsLength, comments, Update]);

    return (
        <div className="w-100">
        {
            commentsLength
            ? (
                <div>
                    {
                        isOneComment
                        ? (
                            <div className="mb-5 w-100">
                                {comments[0]}
                            </div>
                        ) : (
                            <div className="mb-5 w-100">
                                {comments}
                            </div>
                        )
                    }
                </div>
            ) : (
                <Spinner className="spinner" animation="border"/>
            )
        }
        </div>
    )

    if (comments.length > 0) {
        console.log(comments);
        return (
            <div className="mb-5">
                {comments}
            </div>
        );
    } else if (props.hasComment == false) {
        return (
            <div>
                <div className="mt-5 text-center">Oops. Looks like there are no replies yet. Why not leave one?</div>
            </div>
        );
    } else {
        return <Spinner className="spinner" animation="border"/>;
    }

}

export default AltCommentListContainer