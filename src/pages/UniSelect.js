import React, {useEffect, useState} from 'react';
import SideBarItemList from '../containers/SideBarItemList';
import SideItem from './../components/SideItem';
import SideBarTop from '../containers/SideBarTop';
import Thread from '../components/Thread';
import {uniRef, getUniversities} from './../Database';

const UniSelect = (props) => {

    const [loading, setLoading] = useState(true);
    const [uniComponents, setUniComponents] = useState([]);
    // let uniComponents = [];

    useEffect(() => {
        uniRef.on('value', snapshot => {

            let uniArr = [Object.values(snapshot.val()), Object.keys(snapshot.val())];

            if(uniArr.length && loading) {
                for (let i = 0; i < uniArr[0].length; i++) {
                    
                    uniComponents.push(
                        <Thread key={i} variant="uni" id={uniArr[1][i]} name={uniArr[0][i].name} topic={uniArr[0][i].state} units={0} posts={0} />
                    )
                }
                setLoading(false);
            }
        });

        return () => {
            uniRef.off();
        }
    },[loading]);

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

                {/* UNIS */}
                <div className="col-lg-9 threads">
                    {/* <Thread variant="uni" id={"6lWkkHxjoGh6d16OD9h31Eusrxn2"} name={"Queensland University of Technology"} topic={"Queensland"} units={0} posts={0} /> */}
                    {uniComponents}
                </div>

            </div>
        </div>
    )
}

export default UniSelect;