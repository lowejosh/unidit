import React, {useEffect, useState} from 'react';
import NavBarContainer from './containers/NavBarContainer';
import Content from './pages/Content';
import UniSelect from './pages/UniSelect';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import {Spinner} from 'react-bootstrap';
import Routes from './Routes';

// TEMP
import WelcomeModal from './containers/WelcomeModal';

import withFirebaseAuth from 'react-with-firebase-auth'
import * as firebase from 'firebase/app';
import 'firebase/auth';
import fire from './fire';

import './App.scss';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAddressBook } from '@fortawesome/free-solid-svg-icons'
library.add(faAddressBook)

const firebaseApp = firebase.app();
const firebaseAppAuth = firebaseApp.auth();
const providers = {
  googleProvider: new firebase.auth.GoogleAuthProvider(),
};


function authUser() {
   return new Promise(function (resolve, reject) {
      firebase.auth().onAuthStateChanged(function(user) {
        console.log("T");
         if (user) {
            resolve(user);
         } else {
            resolve(null);
         }             
      });
   });
}



const App = (props) => {

  document.title = "MyUni"
  const [isAuthenticating, setIsAuthenticating] = useState(true);

  let viewingComponent = <Spinner className="spinner" animation="border"/>;

  const {
      user,
      signOut,
      signInWithGoogle,
  } = props;

  useEffect(() => {
    authUser().then((user) => {
       setIsAuthenticating(false);
    }, (error) => {
       setIsAuthenticating(false);
    })
  }, []);

  return (
    <div>
      {
        isAuthenticating ? (
          <div>
            <NavBarContainer blank={true} />
            {viewingComponent}
          </div>
        ) : (
          <Routes props={props}/>
        )
      }
    </div>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
