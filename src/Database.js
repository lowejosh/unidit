import withFirebaseAuth from 'react-with-firebase-auth'
import 'firebase/auth';
import * as firebase from 'firebase/app'; 
import fire from './fire';

let db = firebase.app().database();
let uniRef = db.ref('/universities');
let userRef = db.ref('/users');
let unitRef = db.ref('/units');
let threadRef = db.ref('/threads');
let commentRef = db.ref('/comments');
let catRef = db.ref('/categories');

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
        threads: [],
    }
};

const threadModel = (content, posterId, title) => {
    return {
        title: title,
        content: content,
        posterId: posterId,
        lastReplyTimeStamp: new Date(),
        views: 0,
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
    let key = newUniRef.key;

    let categories = ["Course Reviews", "Major Reviews", "Unit Reviews", "Summer Unit Polls", "Questions", "University Guides"];
    for (let i = 0; i < categories.length; i++) {
        let cat = categoryModel(categories[i], key);
        let newCatRef = catRef.push(cat);
    }

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


export {uniRef, catRef, threadRef, userRef, getUniversities, createUni}