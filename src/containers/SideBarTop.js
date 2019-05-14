import React, {useState} from 'react';
import {Form, OverlayTrigger, Popover, Button} from 'react-bootstrap';
import CreateThread from './CreateThread';

const SideBarTop = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const modalClose = () => {setModalShow(false)};

    const popover = (
        <Popover id="popover-basic" title="Sorry!">
            You need to be <strong>signed in</strong> to create a thread.
        </Popover>
    );

    return (
        <div>
            <Form className="my-2">
                <Form.Group controlId="formThreadSearch">
                    <Form.Control type="text" placeholder="Search for threads..." />
                </Form.Group>
            </Form>
            
            {
                props.user
                ?
                    <Button variant="custom-primary w-100 mb-2" className="custom-primary" onClick={() => {
                        if (props.user) {
                            console.log("R");
                            setModalShow(true);
                        } 
                    }}>
                        Create Thread
                    </Button>
                :
                <OverlayTrigger trigger="focus" placement="right" overlay={popover}>
                    <Button variant="custom-primary w-100 mb-2" className="custom-primary">
                        Create Thread
                    </Button>
                </OverlayTrigger>
            }
            <CreateThread show={modalShow} onHide={modalClose} />
        </div>
    );
}

export default SideBarTop;