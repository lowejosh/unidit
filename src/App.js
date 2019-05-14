import React, {useEffect} from 'react';
import NavBarContainer from './containers/NavBarContainer';
import Content from './pages/Content';
import UniSelect from './pages/UniSelect';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import {Spinner} from 'react-bootstrap';

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

const App = (props) => {

  document.title = "MyUni"

  const {
      user,
      signOut,
      signInWithGoogle,
  } = props;

  let usersRef = firebase.database().ref("users");

  const userExistsCallback = (userId, exists) => {
    if (exists) {
      console.log(userId + " exists");
      usersRef.child(user.uid).once('value', function(snapshot) {
        console.log(snapshot.val().selectedUni);
      });
      
      
    } else {
      console.log(userId + " doesnt exist");

    }

  }

  if (user) {
    // Check database for selected Uni
    usersRef.child(user.uid).once('value', function(snapshot) {
      var exists = (snapshot.val() !== null);
      userExistsCallback(user.uid, exists);
    });

  } else {

  }
  
  // let content = <Content user={user}/> 
  const content = () => (
    <div>
      <NavBarContainer sel={"forum"} auth={props} />
      <div style={{marginLeft: "10%", marginRight: "10%", marginTop: "2rem"}}>
        <Content user={user}/>
      </div>
    </div>
  );

  const uniSelect = () => (
    <div>
      <NavBarContainer sel={"select"} auth={props} />
      <div style={{marginLeft: "10%", marginRight: "10%", marginTop: "2rem"}}>
        <UniSelect user={user} />
      </div>
    </div>
  );
  

  return (
    <div>

      <Router>
        <Route exact path="/select" component={uniSelect}/>
        <Route exact path="/" component={content}/>
        
        
      </Router>
    </div>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
