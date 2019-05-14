import firebase from 'firebase'
var config = { /* COPY THE ACTUAL CONFIG FROM FIREBASE CONSOLE */
    apiKey: "AIzaSyB2zU-6sLChXj2EV-im2kK438Bb_FpPTx4",
    authDomain: "myuni-26b5b.firebaseapp.com",
    databaseURL: "https://myuni-26b5b.firebaseio.com",
    projectId: "myuni-26b5b",
    storageBucket: "myuni-26b5b.appspot.com",
    messagingSenderId: "217501333979",
    appId: "1:217501333979:web:6ceaa13b80002820"
};
var fire = firebase.initializeApp(config);
export default fire;


// <!-- The core Firebase JS SDK is always required and must be listed first -->
// <script src="/__/firebase/6.0.2/firebase-app.js"></script>

// <!-- TODO: Add SDKs for Firebase products that you want to use
//      https://firebase.google.com/docs/web/setup#reserved-urls -->

// <!-- Initialize Firebase -->
// <script src="/__/firebase/init.js"></script>