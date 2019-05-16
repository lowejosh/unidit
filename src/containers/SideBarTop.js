import React, {useState} from 'react';
import {Form, OverlayTrigger, Popover, Button} from 'react-bootstrap';
import CreateThread from './CreateThread';
import CreateUni from './CreateUni';

const SideBarTop = (props) => {
    const [modalShow, setModalShow] = useState(false);
    const modalClose = () => {setModalShow(false)};

    const [modalShowUni, setModalShowUni] = useState(false);
    const modalCloseUni = () => {setModalShowUni(false)};

    const popover = (
        <Popover id="popover-basic" title="Sorry!">
            You need to be <strong>signed in</strong> to create a thread.
        </Popover>
    );

    const popoverUni = (
        <Popover id="popover-basic" title="Sorry!">
            You need to be <strong>signed in</strong> to add a university.
        </Popover>
    );

    if (props.variant == "uni") {
        return ( <div>
                <Form className="my-2">
                    <Form.Group controlId="formThreadSearch">
                        <Form.Control type="text" placeholder="Search for Universities..." />
                    </Form.Group>
                </Form>
                
                {
                    props.user
                    ?
                        <Button variant="custom-primary w-100 mb-2" className="custom-primary" onClick={() => {
                            if (props.user) {
                                setModalShowUni(true);
                            } 
                        }}>
                            Add a University
                        </Button>
                    :
                    <OverlayTrigger trigger="focus" placement="right" overlay={popoverUni}>
                        <Button variant="custom-primary w-100 mb-2" className="custom-primary">
                            Add a University
                        </Button>
                    </OverlayTrigger>
                }
                <CreateUni show={modalShowUni} onHide={modalCloseUni} />
            </div>
        );
    }




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