import React from 'react';
import SideBarItemList from '../containers/SideBarItemList';
import SideItem from './../components/SideItem';
import SideBarTop from '../containers/SideBarTop';
import Thread from '../components/Thread';

const UniSelect = (props) => {
    return (
        <div>
            <div className="primary-color"><h3>Select a University</h3></div>
            <hr />
            <div className="row">



                {/* SIDEBAR */}
                <div className="col-lg-3">
                    <SideBarTop variant={"uni"} user={props.user} />
                    <hr />
                    {/* SIDEBAR */}
                    <div>
                        <h4 className="primary-color">State
                        </h4>
                        <div className="w-100 pointer">
                        {/* TODO */}
                            <div>
                                <SideItem top={true} selected={true} name={"All"} />
                                <SideItem name={"Northern Territory"} />
                                <SideItem name={"Queensland"} />
                                <SideItem name={"New South Whales"} />
                                <SideItem name={"Victoria"} />
                                <SideItem name={"ACT"} />
                                <SideItem name={"South Australia"} />
                                <SideItem name={"Western Australia"} />
                                <SideItem bottom={true} name={"Tasmania"} />
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    )
}

export default UniSelect;