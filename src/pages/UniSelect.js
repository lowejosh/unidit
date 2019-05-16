import React, {useEffect, useState} from 'react';
import SideBarItemList from '../containers/SideBarItemList';
import SideItem from './../components/SideItem';
import SideBarTop from '../containers/SideBarTop';
import Thread from '../components/Thread';
import {uniRef, getUniversities} from './../Database';

const UniSelect = (props) => {

    const [loading, setLoading] = useState(true);
    const [uniComponents, setUniComponents] = useState([]);
    const [selectedItem, setSelectedItem] = useState(0);
    const [changingSel, setChangingSel] = useState(false);

    // let uniComponents = [];

    const sideItem = (top, bottom, selected, name, i) => {
            let classNames = "px-3 py-2 w-100";
            if (top) {
                classNames+=" rounded-top";
            } else if (bottom) {
                classNames+=" rounded-bottom";
            }

            if (selected) {
                classNames+=" side-item-sel";
            } else {
                classNames+=" border side-item";
            }

            return (
                <div onClick={() => {setSelectedItem(i); setChangingSel(true); setLoading(true)}} className={classNames}>
                    {name}
                </div>
            );
    }




    let sideList = ["All", "Northern Territory", "Queensland", "New South Whales", "Victoria", "ACT", "South Australia", "Western Australia", "Tasmania"];
    let sideListComponents = [];
    for (let i = 0; i < sideList.length; i++) {
        if (i == 0) {
            // sideListComponents.push(<SideItem key={i} top={true} selected={localStorage.getItem("currentState") == sideList[i]} name={sideList[i]} />);
            sideListComponents.push(sideItem(true, false, (selectedItem == i), sideList[i], i));

        } else if (i == sideList.length) {
            // sideListComponents.push(<SideItem key={i} bottom={true} selected={localStorage.getItem("currentState") == sideList[i]} name={sideList[sideList.length]} />);
            sideListComponents.push(sideItem(false, false, selectedItem == i, sideList[i], i));

        } else {
            // sideListComponents.push(<SideItem key={i} selected={localStorage.getItem("currentState") == sideList[i]} name={sideList[i]} />);
            sideListComponents.push(sideItem(false, true, selectedItem == i, sideList[i], i));
        }
    }

    useEffect(() => {

        if (changingSel) {
            console.log("CAHGNGN");
            setUniComponents([]);
            setChangingSel(false);
        }

        uniRef.on('value', snapshot => {
            let uniArr = [Object.values(snapshot.val()), Object.keys(snapshot.val())];

            if(uniArr.length && loading) {
                for (let i = 0; i < uniArr[0].length; i++) {

                    if (selectedItem == 0) {
                        if (props.selectedUni == uniArr[1][i]) {
                            uniComponents.push(
                                <Thread key={i} variant="uni" sel={true} id={uniArr[1][i]} name={uniArr[0][i].name} topic={uniArr[0][i].state} units={0} posts={0} />
                            )
                        } else {
                            uniComponents.push(
                                <Thread key={i} variant="uni" uid={props.user.uid} id={uniArr[1][i]} name={uniArr[0][i].name} topic={uniArr[0][i].state} units={0} posts={0} />
                            )
                        }
                    } else {
                        if (uniArr[0][i].state == sideList[selectedItem]) {
                            if (props.selectedUni == uniArr[1][i]) {
                                uniComponents.push(
                                    <Thread key={i} variant="uni" sel={true} id={uniArr[1][i]} name={uniArr[0][i].name} topic={uniArr[0][i].state} units={0} posts={0} />
                                )
                            } else {
                                uniComponents.push(
                                    <Thread key={i} variant="uni" uid={props.user.uid} id={uniArr[1][i]} name={uniArr[0][i].name} topic={uniArr[0][i].state} units={0} posts={0} />
                                )
                            }

                        }

                    }
                    
                }
                setLoading(false);
            }
        });

        return () => {
            uniRef.off();
        }
    },[loading, uniComponents]);

    console.log(uniComponents);

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
                                {/* <SideItem top={true} selected={true} name={"All"} />
                                <SideItem name={"Northern Territory"} />
                                <SideItem name={"Queensland"} />
                                <SideItem name={"New South Whales"} />
                                <SideItem name={"Victoria"} />
                                <SideItem name={"ACT"} />
                                <SideItem name={"South Australia"} />
                                <SideItem name={"Western Australia"} />
                                <SideItem bottom={true} name={"Tasmania"} /> */}
                                {sideListComponents}
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