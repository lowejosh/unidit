import React from 'react';
import SideItem from './../components/SideItem';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
library.add(faPlus)


const SideBarItemList = (props) => {
    return (
        <div>
            <h4 className="primary-color">My Topics
            {/* <span className=" pointer position-absolute" style={{right: "1.2rem"}}><FontAwesomeIcon icon={faPlus} color="#1E2448"/></span> */}
            </h4>
            <div className="w-100 pointer">
                <SideItem top={true} selected={true} name={"All"} />
                <SideItem name={"General"} />
                <SideItem name={"News"} />
                <SideItem name={"Help"} />
                <SideItem name={"IAB230"} />
                <SideItem bottom={true} name={"CAB440"} />
            </div>
        </div>
    );
}

export default SideBarItemList;