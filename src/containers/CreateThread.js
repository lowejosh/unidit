import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';

const CreateThread = (props) => {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="background-primary text-background" closeButton>
          <Modal.Title className="mx-auto" id="contained-modal-title-vcenter">
            Create Thread
          </Modal.Title>
        </Modal.Header>
        <Form>
            <Modal.Body>
                    {/* <Form.Label>Title</Form.Label> */}
                    <Form.Group>
                        <Form.Control className="mt-2" size="lg" type="text" placeholder="Title" />
                    </Form.Group>
                    <Form.Group>
                    {/* <Form.Label>Content</Form.Label> */}
                    <Form.Control as="textarea" placeholder="Content" rows="4" />
                    </Form.Group>
                    <Form.Group>
                    {/* TODO */}
                        <Form.Control value={-1} as="select">
                            <option disabled value={-1} key={-1}>Topic</option>
                            <option value={0} key={0}>General</option>
                            <option>Help</option>
                            <option>News</option>
                            <option>IAB230</option>
                            <option>CAB440</option>
                        </Form.Control>
                    </Form.Group>

            </Modal.Body>
            <Modal.Footer>
            <Button className="custom-primary mx-auto w-25" onClick={props.onHide}>Post</Button>
            </Modal.Footer>
        </Form>
      </Modal>
    );
}


export default CreateThread;