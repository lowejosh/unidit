import React from 'react';
import NavBarContainer from './containers/NavBarContainer';
import Content from './containers/Content';
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
  const {
      user,
      signOut,
      signInWithGoogle,
  } = props;

  return (
    <div>
      <NavBarContainer auth={props} />

      <div style={{marginLeft: "10%", marginRight: "10%", marginTop: "2rem"}}>
        <Content user={user}/>
      </div>
    </div>
  );
}

export default withFirebaseAuth({
  providers,
  firebaseAppAuth,
})(App);
