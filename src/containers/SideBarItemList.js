import React from 'react';
import SideItem from './../components/SideItem';

import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { userInfo } from 'os';
library.add(faPlus)


const SideBarItemList = (props) => {
    return (
        <div>
            <h4 className="primary-color">My Topics
            </h4>
            <div className="w-100 pointer">
            {/* TODO */}
                {
                    props.user
                    ?
                    <div>
                    <SideItem top={true} selected={true} name={"All"} />
                    <SideItem name={"General"} />
                    <SideItem name={"News"} />
                    <SideItem name={"Help"} />
                    <SideItem name={"IAB230"} />
                    <SideItem bottom={true} name={"CAB440"} />
                    </div>
                    :
                    <div>
                    <SideItem top={true} selected={true} name={"All"} />
                    <SideItem name={"General"} />
                    <SideItem name={"News"} />
                    <SideItem name={"Help"} />
                    </div>
                }
            </div>
        </div>
    );
}

export default SideBarItemList;