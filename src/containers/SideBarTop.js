import React from 'react';
import {Form, Button} from 'react-bootstrap';

const SideBarTop = (props) => {
    return (
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
    );
}

export default SideBarTop;