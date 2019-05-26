import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import { POINT_CONVERSION_COMPRESSED } from 'constants';

const ModalMod = (props) => {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="background-primary text-background" closeButton>
        <Modal.Title className="mx-auto" id="contained-modal-title-vcenter">
          Thanks for posting!
        </Modal.Title>
      </Modal.Header>
      <Form>
          <Modal.Body>
            <Modal.Body><center>Since this is your first post, only <b>you</b> will be able to see your post until it is approved by moderators. It won't be too long.</center></Modal.Body>

          </Modal.Body>
          <Modal.Footer>
          <Button className="custom-primary mx-auto w-25" onClick={props.onHide}>Got it</Button>
          </Modal.Footer>
      </Form>
    </Modal>
  );
}


export default ModalMod;