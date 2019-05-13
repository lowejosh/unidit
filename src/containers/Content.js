import React from 'react';
import {Row, Col, Form, Button} from 'react-bootstrap';

const Content = (props) => {
    return (
        <div>
            <div className="page-header"><h3>Queensland University of Technology</h3></div>
            <hr />
            <Row>
                <Col>
                {/* SIDEBAR */}
                <div>
                    <Form className="my-2">
                        <Form.Group controlId="formThreadSearch">
                            <Form.Control type="email" placeholder="Search for threads..." />
                        </Form.Group>
                    </Form>
                    <Button variant="custom-primary w-100 mb-2" className="custom-primary" type="submit">
                        Create Thread
                    </Button>
                </div>
                <hr />
                <h4>My Units</h4>
                <div className="w-100 border pointer">
                    <div className="px-3 py-2 rounded-top side-item-sel w-100">
                        All
                    </div>
                    <div className="px-3 py-2 side-item w-100 border">
                        IAB230
                    </div>
                    <div className="px-3 rounded-bottom py-2 side-item w-100 border">
                        CAB440
                    </div>

                </div>
                
                
                
                </Col>
                <Col xs={9}>
                {/* THREADS */}
                <div className="mx-2 w-100 h-75 thread ">
                    REEE:w

                </div>
                
                
                
                </Col>
            </Row>
        </div>
    )
}

export default Content;