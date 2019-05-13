import React from 'react';
import {Row, Col, Form, Button} from 'react-bootstrap';
import SideBarItemList from './SideBarItemList';
import Thread from './../components/Thread';

const Content = (props) => {
    return (
        <div>
            <div className="primary-color"><h3>Queensland University of Technology</h3></div>
            <hr />
            <div className="row">
                <div className="col-lg-3">
                {/* SIDEBAR */}
                <div>
                    <Form className="my-2">
                        <Form.Group controlId="formThreadSearch">
                            <Form.Control type="text" placeholder="Search for threads..." />
                        </Form.Group>
                    </Form>
                    <Button variant="custom-primary w-100 mb-2" className="custom-primary" type="submit">
                        Create Thread
                    </Button>
                </div>

                <hr />
                <SideBarItemList />

                </div>
                <div className="col-lg-9 threads">
                {/* THREADS */}

                <Thread user={"TestAccount"} time={"23 minutes ago"} title={"Thread Title"} preview={"REEEEEEEEEEEEEEEEEEE..."} />
                <Thread user={"TestAccount2"} time={"5 hours ago"} title={"How does this work"} preview={"Someone tell me please"} />
                <Thread user={"Test3"} time={"6 hours ago"} title={"Help me"} preview={"I don't know man"} />
                <Thread user={"Tes4"} time={"2 days ago"} title={"Assignment Help"} preview={"This is a content preview"} />
                
                
                </div>
            </div>
        </div>
    )
}

export default Content;