import React, {useState} from 'react';
// import SideBarItemList from '../containers/SideBarItemList';
import SideItem from './../components/SideItem';
import SideBarTop from '../containers/SideBarTop'
import Thread from '../components/Thread';
import {uniRef, catRef} from './../Database';
import AltCategory from '../components/AltCategory';
import AltCategoryContainer from '../containers/AltCategoryContainer';
import { BrowserRouter as Router, Route, Link, Redirect } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments, faChartBar, faNewspaper, faGavel, faStar, faQuestionCircle, faBookOpen } from '@fortawesome/free-solid-svg-icons'
import { database } from 'firebase';
library.add(faComments, faChartBar, faNewspaper, faGavel, faStar, faQuestionCircle, faBookOpen)

const AltContent = (props) => {
    
    const [uniName, setUniName] = useState("Loading...");
    const [generalThreads, setGeneralThreads] = useState("Loading...");
    const [questionThreads, setQuestionThreads] = useState("Loading...");
    uniRef.child(props.selectedUni).once('value', function(snapshot) {
        try {
            setUniName(snapshot.val().name);
        } catch (e) {
            alert("Your selected university no longer exists");
            document.location.href="/select";
        }
    });

    catRef.child("general").once("value", (snapshot) => {
        setGeneralThreads(snapshot.val().threads);
    });

    catRef.once("value", (snapshot) => {
        console.log(snapshot.val());
        if (snapshot.val().uni == props.selectedUni && snapshot.val().name == "Questions") {
            console.log(snapshot.val().threads);
        }
    })

    catRef.child("questions").once("value", (snapshot) => {
        setQuestionThreads(snapshot.val().threads);
    });

    // === DEPRECATED to FORUM.js ===
    // // Get the category IDs for all categories with a matching university ID
    // let courseId;
    // let majorId;
    // let unitId;
    // let summerId;
    // let questionId;
    // let guideId;

    // catRef.on("value", (snapshot) => {
    //     snapshot.forEach((childSnapshot) => {
    //         if (props.selectedUni == childSnapshot.val().uni) {
    //             switch (childSnapshot.val().name) {
    //                 case "Course Reviews":
    //                     courseId = childSnapshot.key;
    //                     break;
    //                 case "Major Reviews":
    //                     majorId = childSnapshot.key;
    //                     break;
    //                 case "Unit Reviews":
    //                     unitId = childSnapshot.key;
    //                     break;
    //                 case "Summer Unit Polls":
    //                     summerId = childSnapshot.key;
    //                     break;
    //                 case "Questions":
    //                     questionId = childSnapshot.key;
    //                     break;
    //                 case "University Guides":
    //                     guideId = childSnapshot.key;
    //                     break;
    //             }
    //         }  
    //     });
    // })

    // console.log(majorId + " : " + courseId + " : " + unitId + " : " + summerId + " : " + questionId + " : " + guideId);

    // temp
    let categoryArr1 = [
        <AltCategory name={"General Discussion"} icon={faComments} route="/general" threads={generalThreads}/>, 
        <AltCategory name={"University Statistics"} icon={faChartBar} description={"Find the best university and courses for you"} route="/stats"/>,
        <AltCategory name={"News"} icon={faNewspaper} description={"Latest site news and updates"} route="/news"/>,
        <AltCategory name={"Rules and Code of Conduct"} icon={faGavel} description={"Read this before posting"} route="/rules"/>,
    ];

    let categoryArr2 = [
        <AltCategory name={"Course Reviews"} icon={faStar} route="/course-reviews" description="Read or write reviews about a course"/>, 
        <AltCategory name={"Major Reviews"} icon={faStar} route="/major-reviews" description="Read or write reviews about a major"/>,
        <AltCategory name={"Unit Reviews"} icon={faStar} route="/unit-reviews" description="Read or write reviews about a unit"/>,
        <AltCategory name={"Summer Unit Polls"} icon={faGavel} description={"Read this before posting"} route="/summer-polls"/>,
    ];

    let categoryArr3 = [
        <AltCategory name={"Questions"} icon={faQuestionCircle} route="/questions" threads={questionThreads}/>, 
        <AltCategory name={"University Guides"} icon={faBookOpen} description={"Guides for university applicants and students alike"} route="/guides"/>,
    ];

    return (
        <div className="mb-5">
            <AltCategoryContainer name={"General"} categories={categoryArr1}/>
            <AltCategoryContainer name={uniName} categories={categoryArr2}/>
            <AltCategoryContainer name={"Help"} categories={categoryArr3}/>
        </div>
    );
}

export default AltContent;