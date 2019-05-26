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
import {Spinner, Form, Button} from 'react-bootstrap';
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
      <NavBarContainer sel={"forum"} auth={props.props} />
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

  const guides = () => (
    <div>
      {
        selectedUni ? (
          <div>
            <NavBarContainer sel={"forum"} auth={props.props} />
            <div style={{marginLeft: "15%", marginRight: "15%", marginTop: "2rem"}}>
              <div className="w-100 background-primary text-background p-3 m-0"><a href="/">Forum</a> > <a href="/guides">University Guides</a></div>
              <div className="mb-5 p-3 border-left border-bottom background-light-background border-right m-0">
                <p>Want to apply? <a href="https://www.qut.edu.au/study/applying" style={{color: "blue"}}>Click here</a></p>
                <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
                <div className="text-center">
                  <img className="img-fluid my-2 mb-4 border" src="map.jpg"></img>
                </div>
                <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo. Quisque sit amet est et sapien ullamcorper pharetra. Vestibulum erat wisi, condimentum sed, commodo vitae, ornare sit amet, wisi. Aenean fermentum, elit eget tincidunt condimentum, eros ipsum rutrum orci, sagittis tempus lacus enim ac dui. Donec non enim in turpis pulvinar facilisis. Ut felis. Praesent dapibus, neque id cursus faucibus, tortor neque egestas augue, eu vulputate magna eros eu erat. Aliquam erat volutpat. Nam dui mi, tincidunt quis, accumsan porttitor, facilisis luctus, metus</p>
                <ul>
                  <li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li>
                  <li>Aliquam tincidunt mauris eu risus.</li>
                  <li>Vestibulum auctor dapibus neque.</li>
                </ul>
                <p>Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget, tempor sit amet, ante. Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.</p>
         
              </div>
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
  
  const summerPolls = () => (
    <div>
      {
        selectedUni ? (
          <div>
            <NavBarContainer sel={"forum"} auth={props.props} />
            <div style={{marginLeft: "15%", marginRight: "15%", marginTop: "2rem"}}>
              <div className="w-100 background-primary text-background p-3 m-0"><a href="/">Forum</a> > <a href="/summer-polls">Summer Polls</a></div>
              <div className="mb-5 p-3 border-left border-bottom background-light-background border-right m-0">
                <div>
                {
                  localStorage.getItem("polled") !== "true"
                  ? (
                    <div>
                      <Form onSubmit={() => {
                          localStorage.setItem("polled", "true");
                        }}>
                        <div className="p-3 background-background border m-3 mb-4">
                        <h5>Science, Engineering & Information Technology</h5>
                          <div className="mx-auto">
                            <Form.Check 
                              type={'radio'}
                              className="my-2 mt-3"
                              id={'IFZ448'}
                              name={'SEIT'}
                              label={'IFZ448 | Thesis'}
                            />
                            <Form.Check 
                              className="my-2"
                              type={'radio'}
                              id={'LQB502'}
                              name={'SEIT'}
                              label={'LQB502 | Biomedical Work Integrated Learning A'}
                            />
                            <Form.Check 
                              className="my-2"
                              type={'radio'}
                              id={'PCN540-1'}
                              name={'SEIT'}
                              label={'PCN540-1 | Project (PT)'}
                            />
                          </div>
                        </div>
                        <div className="p-3 background-background border m-3 mb-4">
                        <h5>Business, Economics & Law</h5>
                          <div className="mx-auto">
                            <Form.Check 
                              type={'radio'}
                              className="my-2 mt-3"
                              id={'AMB200'}
                              name={'BEL'}
                              label={'AMB200 | Consumer Behaviour'}
                            />
                            <Form.Check 
                              className="my-2"
                              type={'radio'}
                              id={'AMB336'}
                              name={'BEL'}
                              label={'AMB336 | International Marketing'}
                            />
                            <Form.Check 
                              className="my-2"
                              type={'radio'}
                              id={'BSB110'}
                              name={'BEL'}
                              label={'BSB110 | Accounting'}
                            />
                          </div>
                        </div>
                        <div className="p-3 background-background border m-3 mb-4">
                        <h5>Health & Behavioural Science</h5>
                          <div className="mx-auto">
                            <Form.Check 
                              type={'radio'}
                              className="my-2 mt-3"
                              id={'PYB301'}
                              name={'HBS'}
                              label={'PYB301 | Psychology in the Community: Placement'}
                            />
                            <Form.Check 
                              className="my-2"
                              type={'radio'}
                              id={'PYN052-8'}
                              name={'HBS'}
                              label={'PYN052-8 | Research Thesis'}
                            />
                            <Form.Check 
                              className="my-2"
                              type={'radio'}
                              id={'HLN703'}
                              name={'HBS'}
                              label={'HLN703 | Project'}
                            />
                          </div>
                        </div>
                        <div className="p-3 background-background border m-3 mb-4">
                          <h5>Humanities & Social Science</h5>
                          <div className="mx-auto">
                            <Form.Check 
                              type={'radio'}
                              className="my-2 mt-3"
                              id={'SWB316'}
                              name={'HSS'}
                              label={'SWB316 | Social Work Field Education 1A'}
                            />
                            <Form.Check 
                              className="my-2"
                              type={'radio'}
                              id={'SWB406'}
                              name={'HSS'}
                              label={'SWB406 | Transition to Practice'}
                            />
                            <Form.Check 
                              className="my-2"
                              type={'radio'}
                              id={'SWH310'}
                              name={'HSS'}
                              label={'SWH310 | Linking Social Work Theory and Practice'}
                            />
                          </div>
                        </div>

                        <div className="p-3 background-background border m-3">
                          <h5>Medicine</h5>
                          <div className="mx-auto">
                            <Form.Check 
                              type={'radio'}
                              className="my-2 mt-3"
                              id={'CSB044'}
                              name={'M'}
                              label={'CSB044 | Clinical Radiography 2'}
                            />
                            <Form.Check 
                              className="my-2"
                              type={'radio'}
                              id={'CWB331'}
                              name={'M'}
                              label={'CWB331 | Paramedic Clinical Practice 1'}
                            />
                            <Form.Check 
                              className="my-2"
                              type={'radio'}
                              id={'CSH080'}
                              name={'M'}
                              label={'CSH080 | Transition to Professional Practice 2'}
                            />
                          </div>
                        </div>
                        <div className="mx-auto w-50">
                          <Button className="custom-primary m-3 mx-auto" variant="mx-3 w-100 display-block mx-auto" type="submit">Submit</Button>
                        </div>
                      </Form>
                    </div>
                ) : (
                  <div className="text-center w-100">
                    Thank you for voting! 
                  </div>
                )
              }
              </div>
              </div>
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
            <Route exact path="/guides" component={guides}/>
            <Route exact path="/summer-polls" component={summerPolls}/>
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

