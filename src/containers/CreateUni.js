import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';

const CreateUni = (props) => {

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
          Add a University
        </Modal.Title>
      </Modal.Header>
      <Form>
          <Modal.Body>
                  {/* <Form.Label>Title</Form.Label> */}
                  <Form.Group>
                      <Form.Control className="mt-2" size="lg" type="text" placeholder="University Name" />
                  </Form.Group>
                  <Form.Group>
                  {/* TODO */}
                      <Form.Control value={selectValue} as="select" onChange={handleChange}>
                          <option disabled value={-1} key={-1}>State</option>
                          <option value={0} key={0}>Northern Territory</option>
                          <option value={1} key={1}>Queensland</option>
                          <option value={2} key={2}>New South Whales</option>
                          <option value={3} key={3}>Victoria</option>
                          <option value={4} key={4}>ACT</option>
                          <option value={5} key={5}>South Australia</option>
                          <option value={6} key={6}>Western Australia</option>
                          <option value={7} key={7}>Tasmania</option>

                     </Form.Control>
                  </Form.Group>

          </Modal.Body>
          <Modal.Footer>
          <Button className="custom-primary mx-auto w-25" onClick={props.onHide}>Add</Button>
          </Modal.Footer>
      </Form>
    </Modal>
  );
}


export default CreateUni;