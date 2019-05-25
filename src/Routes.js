import React, {useEffect, useState} from 'react';
import NavBarContainer from './containers/NavBarContainer';
import Content from './pages/Content';
import Forum from './pages/Forum';
import AltContent from './pages/AltContent';
import UniSelect from './pages/UniSelect';
import Reviews from './pages/Reviews';
import ThreadPage from './pages/ThreadPage';
import ReviewPage from './pages/ReviewPage';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';
import Stats from './pages/Stats';
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
  
  // let content = <Content user={user}/> 
  const general = () => (
    <div>
    {
      selectedUni ? (
        <div>
          <NavBarContainer sel={"forum"} auth={props.props} />
          <div style={{marginLeft: "15%", marginRight: "15%", marginTop: "2rem"}}>
            {/* <Content selectedUni={selectedUni} user={user}/> */}
            <Forum selectedUni={selectedUni} user={user} name={"General Discussion"} type="global" route="/general"/>
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

  const questions = () => (
    <div>
    {
      selectedUni ? (
        <div>
          <NavBarContainer sel={"forum"} auth={props.props} />
          <div style={{marginLeft: "15%", marginRight: "15%", marginTop: "2rem"}}>
            {/* <Content selectedUni={selectedUni} user={user}/> */}
            <Forum selectedUni={selectedUni} user={user} name={"Questions"} type="global" route="/questions"/>
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

  const thread = ({ match }) => (
    <div>
    {
      selectedUni ? (
        <div>
          <NavBarContainer sel={"forum"} auth={props.props} />
          <div style={{marginLeft: "15%", marginRight: "15%", marginTop: "2rem"}}>
            {/* <Content selectedUni={selectedUni} user={user}/> */}
              <ThreadPage id={match.params.id} user={user} />
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

  const ratings = ({ match }) => (
    <div>
    {
      selectedUni ? (
        <div>
          <NavBarContainer sel={"forum"} auth={props.props} />
          <div style={{marginLeft: "15%", marginRight: "15%", marginTop: "2rem"}}>
            {/* <Content selectedUni={selectedUni} user={user}/> */}
              <ReviewPage id={match.params.id} user={user} />
              {/* {match.params.id} */}
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

 const stats = () => (
    <div>
      <NavBarContainer sel={"select"} auth={props.props} />
      <div style={{marginLeft: "15%", marginRight: "15%", marginTop: "2rem"}}>
          <Stats user={user} />
      </div>
    </div>
  );

  const courseReviews = () => (
    <div>
      {
        selectedUni ? (
          <div>
            <NavBarContainer sel={"forum"} auth={props.props} />
            <div style={{marginLeft: "15%", marginRight: "15%", marginTop: "2rem"}}>
              <Reviews name="Course Reviews" selectedUni={selectedUni} user={user} type="Course" route="/course-reviews"/>
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

  const majorReviews = () => (
    <div>
      {
        selectedUni ? (
          <div>
            <NavBarContainer sel={"forum"} auth={props.props} />
            <div style={{marginLeft: "15%", marginRight: "15%", marginTop: "2rem"}}>
              <Reviews name="Major Reviews" selectedUni={selectedUni} user={user} type="Major" route="/major-reviews"/>
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

  const unitReviews = () => (
    <div>
      {
        selectedUni ? (
          <div>
            <NavBarContainer sel={"forum"} auth={props.props} />
            <div style={{marginLeft: "15%", marginRight: "15%", marginTop: "2rem"}}>
              <Reviews name="Unit Reviews" selectedUni={selectedUni} user={user} type="Unit" route="/unit-reviews"/>
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
            <Route exact path="/" component={content}/>
            <Route exact path="/select" component={uniSelect}/>
            <Route exact path="/general" component={general}/>
            <Route exact path="/questions" component={questions}/>
            <Route exact path="/course-reviews" component={courseReviews}/>
            <Route exact path="/major-reviews" component={majorReviews}/>
            <Route exact path="/unit-reviews" component={unitReviews}/>
            <Route exact path="/stats" component={stats}/>
            <Route path="/thread:id" component={thread}/>
            <Route path="/ratings:id" component={ratings}/>
          </Router>

        )
      }

    </div>
  );
}

export default Routes;

