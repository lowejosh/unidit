import withFirebaseAuth from 'react-with-firebase-auth'
import 'firebase/auth';
import * as firebase from 'firebase/app'; 
import fire from './fire';

let db = firebase.app().database();
let uniRef = db.ref('/universities');
let unitRef = db.ref('/units');
let threadRef = db.ref('/threads');
let commentRef = db.ref('/comments');

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
    }
};

const unitModel = (faculty, name, uniId) => {
    return {
        faculty: faculty,
        name: name,
        threads: [],
    }
};

const threadModel = (content, posterId, title) => {
    return {
        title: title,
        content: content,
        positerId: posterId,
        lastReplyTimeStamp: new Date(),
        comments: [],
    }
};

const commentModel = (id, title, content) => {
    return {
        title: title,
        content: content,
        timestamp: new Date(),
        votes: 0
    }
};

const createUni = (name, state) => {
    let uni = uniModel(name, state);
    let newUniRef = uniRef.push(uni);
    return newUniRef.key;
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


export {uniRef, getUniversities, createUni}