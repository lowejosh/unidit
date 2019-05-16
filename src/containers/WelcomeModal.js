import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import { POINT_CONVERSION_COMPRESSED } from 'constants';

const WelcomeModal = (props) => {

  const [selectValue, setSelectValue] = useState(-1); 

  const handleChange = (e) => {
    setSelectValue(e.target.value);
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="background-primary text-background" closeButton>
        <Modal.Title className="mx-auto" id="contained-modal-title-vcenter">
          Welcome!
        </Modal.Title>
      </Modal.Header>
      <Form>
          <Modal.Body>
            <Modal.Body>It looks like its your first time visiting, please begin by selecting your university.</Modal.Body>

          </Modal.Body>
          <Modal.Footer>
          <Button className="custom-primary mx-auto w-25" onClick={props.onHide}>Got it</Button>
          </Modal.Footer>
      </Form>
    </Modal>
  );
}


export default WelcomeModal;