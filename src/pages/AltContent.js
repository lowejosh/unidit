import React, {useState} from 'react';
// import SideBarItemList from '../containers/SideBarItemList';
import SideItem from './../components/SideItem';
import SideBarTop from '../containers/SideBarTop'
import Thread from '../components/Thread';
import {uniRef} from './../Database';
import AltCategory from '../components/AltCategory';
import AltCategoryContainer from '../containers/AltCategoryContainer';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faComments, faChartBar, faNewspaper, faGavel, faStar, faQuestionCircle, faBookOpen } from '@fortawesome/free-solid-svg-icons'
library.add(faComments, faChartBar, faNewspaper, faGavel, faStar, faQuestionCircle, faBookOpen)

const AltContent = (props) => {
    const [uniName, setUniName] = useState("Loading...");
    uniRef.child(props.selectedUni).once('value', function(snapshot) {
        setUniName(snapshot.val().name);
    });

    // temp
    let categoryArr1 = [
        <AltCategory name={"General Discussion"} icon={faComments}/>, 
        <AltCategory name={"University Statistics"} icon={faChartBar} description={"Find the best university and courses for you"} />,
        <AltCategory name={"News"} icon={faNewspaper} description={"Latest site news and updates"} />,
        <AltCategory name={"Rules and Code of Conduct"} icon={faGavel} description={"Read this before posting"} />,
    ];

    let categoryArr2 = [
        <AltCategory name={"Course Reviews"} icon={faStar}/>, 
        <AltCategory name={"Major Reviews"} icon={faStar} />,
        <AltCategory name={"Unit Reviews"} icon={faStar} />,
        <AltCategory name={"Summer Unit Polls"} icon={faGavel} description={"Read this before posting"} />,
    ];

    let categoryArr3 = [
        <AltCategory name={"Questions"} icon={faQuestionCircle}/>, 
        <AltCategory name={"University Guides"} icon={faBookOpen} description={"Guides for university applicants and students alike"} />,
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