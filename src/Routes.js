import React, {useEffect, useState} from 'react';
import NavBarContainer from './containers/NavBarContainer';
import Content from './pages/Content';
import AltContent from './pages/AltContent';
import UniSelect from './pages/UniSelect';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import {Spinner} from 'react-bootstrap';
import * as Database from './Database';

// TEMP
import WelcomeModal from './containers/WelcomeModal';

import * as firebase from 'firebase/app';

const Routes = (props) => {

  document.title = "MyUni"
  const [selectedUni, setSelectedUni] = useState(null);
  const [isCheckingForUni, setIsCheckingForUni] = useState(true);

  let viewingComponent = <Spinner className="spinner" animation="border"/>;
  let user = props.props.user;
  let isAuthenticating = props.props.isAuthenticating;
  let usersRef = firebase.database().ref("users");

  const userExistsCallback = (userId, exists) => {
    if (exists) {
      usersRef.child(user.uid).once('value', function(snapshot) {
        setSelectedUni(snapshot.val().selectedUni);
        setIsCheckingForUni(false);
      });
    } else {
      setIsCheckingForUni(false);
    }
  }




  useEffect(() =>{
    if (!props.isAuthenticating) {
        if (isCheckingForUni) {
            if (user) {
                // Check database for selected Uni
                if (localStorage.getItem("selectedUniversity")) {
                    console.log("REACHED");
                    setSelectedUni(localStorage.getItem("selectedUniversity"));
                    setIsCheckingForUni(false);
                } else {
                    usersRef.child(user.uid).once('value', function(snapshot) {
                        var exists = (snapshot.val() !== null);
                        userExistsCallback(user.uid, exists);
                    });
                }
            } else {
                if (localStorage.getItem("selectedUniversity")) {
                    setSelectedUni(localStorage.getItem("selectedUniversity"));
                }
                setIsCheckingForUni(false);
            }
        }
    }
  },[isCheckingForUni])

    console.log(selectedUni);
  const [modalShow, setModalShow] = useState(true);
  const modalClose = () => {setModalShow(false)};
  
  // let content = <Content user={user}/> 
  const content = () => (
    <div>
    {
      selectedUni ? (
        <div>
          <NavBarContainer sel={"forum"} auth={props.props} />
          <div style={{marginLeft: "15%", marginRight: "15%", marginTop: "2rem"}}>
            {/* <Content selectedUni={selectedUni} user={user}/> */}
            <AltContent selectedUni={selectedUni} user={user}/>
          </div>
        </div>
      ) : (
        <Route>
          <Redirect to="/select" />
        </Route>

      )
    }
    </div>
  );

  const uniSelect = () => (
    <div>
    {
      selectedUni ? (
      <div>
        <NavBarContainer sel={"select"} auth={props.props} />
        <div style={{marginLeft: "15%", marginRight: "15%", marginTop: "2rem"}}>
            <UniSelect selectedUni={selectedUni} user={user} />
        </div>
      </div>
    ) : (
        <div>
          <NavBarContainer sel={"select"} auth={props.props} />
          <div style={{marginLeft: "15%", marginRight: "15%", marginTop: "2rem"}}>
            <UniSelect user={user} />
          </div>

          <WelcomeModal show={modalShow} signInWithGoogle={props.props.signInWithGoogle} onHide={modalClose} />
        </div>
    )}
    </div>
  );
  
          // {/* <Spinner className="spinner" animation="border"/> */}

  return (
    <div>
      {
        isAuthenticating || isCheckingForUni ? (
          <div>
            <NavBarContainer blank={true} />
            {viewingComponent}
          </div>
        ) : (
          <Router>
            <Route exact path="/select" component={uniSelect}/>
            <Route exact path="/" component={content}/>
          </Router>

        )
      }

    </div>
  );
}

export default Routes;

