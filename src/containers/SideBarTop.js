import React, {useState} from 'react';
import {Form, Button} from 'react-bootstrap';
import CreateThread from './CreateThread';

const SideBarTop = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const modalClose = () => {setModalShow(false)};

    return (
        <div>
            <Form className="my-2">
                <Form.Group controlId="formThreadSearch">
                    <Form.Control type="text" placeholder="Search for threads..." />
                </Form.Group>
            </Form>
            <Button variant="custom-primary w-100 mb-2" className="custom-primary" onClick={() => {
                setModalShow(true);
            }}>
                Create Thread
            </Button>
            <CreateThread show={modalShow} onHide={modalClose} />
        </div>
    );
}

export default SideBarTop;