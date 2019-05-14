import React from 'react';
import SideBarItemList from './SideBarItemList';
import SideBarTop from './SideBarTop'
import Thread from './../components/Thread';

const Content = (props) => {
    return (
        <div>
            <div className="primary-color"><h3>Queensland University of Technology</h3></div>
            <hr />
            <div className="row">



                {/* SIDEBAR */}
                <div className="col-lg-3">
                    <SideBarTop />
                    <hr />
                    <SideBarItemList user={props.user} />
                </div>



                {/* THREADS */}
                <div className="col-lg-9 threads">
                    <Thread user={"TestAccount"} topic={"CAB440"} time={"23 minutes ago"} title={"Thread Title"} preview={"REEEEEEEEEEEEEEEEEEE..."} />
                    <Thread user={"TestAccount2"} topic={"Help"} time={"5 hours ago"} title={"How does this work"} preview={"Someone tell me please"} />
                    <Thread user={"Test3"} topic={"General"} time={"6 hours ago"} title={"Help me"} preview={"I don't know man"} />
                    <Thread user={"Tes4"} topic={"Help"} time={"2 days ago"} title={"Assignment Help"} preview={"This is a content preview"} />
                </div>
            </div>
        </div>
    )
}

export default Content;