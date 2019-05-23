import withFirebaseAuth from 'react-with-firebase-auth'
import 'firebase/auth';
import * as firebase from 'firebase/app'; 
import fire from './fire';
import { collapseTextChangeRangesAcrossMultipleVersions } from 'typescript';

let db = firebase.app().database();
let uniRef = db.ref('/universities');
let userRef = db.ref('/users');
let unitRef = db.ref('/units');
let threadRef = db.ref('/threads');
let commentRef = db.ref('/comments');
let catRef = db.ref('/categories');
let ratingRef = db.ref('/ratings');
let ratingObjRef = db.ref('/ratingObjs');

const userModel = (selectedUni) => {
    return {
        uni: selectedUni
    }
};

const uniModel = (name, state) => {
    return {
        name: name,
        state: state,
        unitCount: 0,
        postCount: 0,
        units: [],
        categories: [],
    }
};

const unitModel = (faculty, name, uniId) => {
    return {
        faculty: faculty,
        name: name,
        threads: [],
    }
};

const categoryModel = (name, uniId) => {
    return {
        uni: uniId,
        name: name,
        threadExists: false,
        threads: 0,
        hasRatingObject: false,
        //ratingObjectList
        //threadList
    }
};

const threadModel = (title, content, posterId, posterName, categoryId) => {
    return {
        title: title,
        content: content,
        posterId: posterId,
        posterName: posterName,
        categoryId: categoryId,
        timeStamp: Date.parse(new Date().toString()),
        lastReplyTimeStamp: Date.parse(new Date().toString()),
        views: 0,
        comments: 0,
        hasComment: false,
    }
};

const commentModel = (content, uid, uname, threadId) => {
    return {
        content: content,
        timeStamp: Date.parse(new Date().toString()),
        votes: 0,
        posterId: uid,
        posterName: uname,
        threadId: threadId,
    }
};

const ratingObjectModel = (objectName, id, categoryId, faculty) => {
    return {
        targetId: id,
        categoryId: categoryId,
        name: objectName,
        ratingSum: 0,
        ratingAvg: 0,
        ratings: 0,
        faculty: faculty,
        avgRating: null,
        //ratingList
    }
}

const ratingModel = (content, posterId, posterName, categoryId, targetId, rating, objectKey) => {
    return {
        content: content,
        posterId: posterId,
        posterName: posterName,
        categoryId: categoryId,
        targetId: targetId,
        rating: rating,
        objectKey: objectKey,
        timeStamp: Date.parse(new Date().toString()),
    }
};
const createRatingObject = (objectName, targetId, categoryId, faculty) => {
    let ratingObj = ratingObjectModel(objectName, targetId, categoryId, faculty);
    let newRatingObjRef = ratingObjRef.push(ratingObj);
    return newRatingObjRef.key;
}

const createRating = (content, posterId, posterName, categoryId, targetId, targetName, rating, faculty) => {
    // check every rating object to see if there is matching categoryId and targetId
    let objectKey = null;
    ratingObjRef.once("value", (snapshot) => {
        snapshot.forEach((child) => {
            console.log(targetId + "===" + child.val().targetId + "   " + categoryId + "===" + child.val().categoryId);
            if (targetId == child.val().targetId && categoryId == child.val().categoryId) {
                objectKey = child.key;
                ratingObjRef.child(objectKey).update({"ratings": child.val().ratings + 1});
                ratingObjRef.child(objectKey).update({"ratingSum": child.val().ratingSum + rating});
            } 
        })
        if (!objectKey) {
            objectKey = createRatingObject(targetName, targetId, categoryId, faculty);
            ratingObjRef.child(objectKey).once("value", (snapshot) => {
                ratingObjRef.child(objectKey).update({"ratings": snapshot.val().ratings + 1});
                ratingObjRef.child(objectKey).update({"ratingSum": snapshot.val().ratingSum + rating});
            })
            let catRatingObjRef = db.ref('/categories/' + categoryId + '/ratingObjList');
            catRatingObjRef.push(objectKey);
            catRef.child(categoryId).update({"hasRatingObject": true});
        }
        let ratingM = ratingModel(content, posterId, posterName, categoryId, targetId, rating, objectKey);
        let newRatingRef = ratingRef.push(ratingM);

        // ratingObjRef.child(objectKey).once("child_changed", (snapshot) => {
        //     console.log("RATING : " + snapshot.val().ratingSum);
        //     ratingObjRef.child(objectKey).update({"ratings": snapshot.val().ratings + 1});
        //     ratingObjRef.child(objectKey).update({"ratingSum": snapshot.val().ratingSum + rating});
        // })

        // // Update average rating
        // db.ref("ratingObjs/" + objectKey + "/ratingSum").transaction((ratingSum) => {
        //     return ratingSum + rating;
        // })
        // // db.ref("ratingObjs/" + objectKey + "/ratings").transaction((ratings) => {
        // //     return ratings + 1;
        // // })
        // // ratingObjRef.child(objectKey).on("value", (snapshot) => {
        // //     console.log("RATING : " + snapshot.val().ratingSum);
        // //     ratingObjRef.child(objectKey).update({"ratingSum": snapshot.val().ratingSum + rating});
        // //     ratingObjRef.child(objectKey).update({"ratings": snapshot.val().ratings + 1});
        // //     ratingObjRef.child(objectKey).update({"ratingAvg": (snapshot.val().ratingSum / snapshot.val().ratings)});
        // // })
        let ratingRatingObjRef = db.ref('/ratingObjs/' + objectKey + '/ratingList');
        let key = newRatingRef.key;
        ratingRatingObjRef.push(key);
    })


}


const createUni = (name, state) => {
    let uni = uniModel(name, state);
    let newUniRef = uniRef.push(uni);
    let key = newUniRef.key;
    let uniCatRef = db.ref('/universities/' + key + '/categoryList');

    let categories = ["Course Reviews", "Major Reviews", "Unit Reviews", "Summer Unit Polls", "Questions", "University Guides"];
    for (let i = 0; i < categories.length; i++) {
        let cat = categoryModel(categories[i], key);
        let newCatRef = catRef.push(cat);
        uniCatRef.push(newCatRef.key);

    }

    return newUniRef.key;
}

const createThread = (title, content, uid, uname, categoryId) => {
    let thread = threadModel(title, content, uid, uname, categoryId);
    let newThreadRef = threadRef.push(thread);
    let key = newThreadRef.key;

    // Update the category
    catRef.child(categoryId).once('value', (snapshot) => {
        if (!snapshot.val().threadExists) {
            catRef.child(categoryId).update({'threadExists': true});
        }
        catRef.child(categoryId).update({'threads': snapshot.val().threads + 1})
    })
    let catThreadRef = db.ref('/categories/' + categoryId + '/threadList');
    catThreadRef.push(key);

    return key;
}

const createComment = (content, uid, uname, threadId) => {
    let comment = commentModel(content, uid, uname, threadId);
    let newCommentRef = commentRef.push(comment);
    let key = newCommentRef.key;

    // Update the thread
    threadRef.child(threadId).once('value', (snapshot) => {
        if (!snapshot.val().hasComment) {
            threadRef.child(threadId).update({'hasComment': true});
        }
        threadRef.child(threadId).update({'comments': (snapshot.val().comments + 1)})
        threadRef.child(threadId).update({'lastReplyTimeStamp': (Date.parse(new Date().toString()))})
    })
    let threadCommentRef = db.ref('/threads/' + threadId + '/commentList');
    threadCommentRef.push(key);

    return key;
}

const getUniversities = () => {
    let unis = [];
    uniRef.once("value", function(snapshot) {
        snapshot.forEach(function(child) {
            unis.push({key: child.key, val: child.val()});
        })
    })
    return(unis);
}


export {uniRef, catRef, commentRef, threadRef, userRef, ratingRef, ratingObjRef, createRating, getUniversities, createUni, createThread, createComment}