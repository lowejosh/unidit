import React, {useEffect, useRef, useState} from 'react';
import ReactDOM from 'react-dom';
import {Modal, Button, Form} from 'react-bootstrap';
import { readFileSync } from 'fs';
import { createUni } from '../Database';
// import {createUni} from './../Database';

const CreateUni = (props) => {

  const [selectValue, setSelectValue] = useState(-1); 
  const [title, setTitle] = useState();

  const handleChange = (e) => {
    setSelectValue(e.target.value);
  }

  // const titleRef = useRef();
  // const stateRef = useRef();

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
      <Form
        onSubmit={() => {
            if (title && selectValue !== -1) {
              createUni(title, selectValue);
            }
          }
        } 
      >
          <Modal.Body>
                  {/* <Form.Label>Title</Form.Label> */}
                  <Form.Group>
                      <Form.Control onChange={(e) => {
                        setTitle(e.target.value)
                        }} className="mt-2" size="lg" type="text" placeholder="University Name" />
                  </Form.Group>
                  <Form.Group>
                  {/* TODO */}
                      <Form.Control value={selectValue} as="select" onChange={handleChange}>
                          <option disabled value={-1} key={-1}>State</option>
                          <option value={"Northern Territory"} key={0}>Northern Territory</option>
                          <option value={"Queensland"} key={1}>Queensland</option>
                          <option value={"New South Whales"} key={2}>New South Whales</option>
                          <option value={"Victoria"} key={3}>Victoria</option>
                          <option value={"ACT"} key={4}>ACT</option>
                          <option value={"South Australia"} key={5}>South Australia</option>
                          <option value={"Western Australia"} key={6}>Western Australia</option>
                          <option value={"Tasmania"} key={7}>Tasmania</option>

                     </Form.Control>
                  </Form.Group>

          </Modal.Body>
          <Modal.Footer>
          <Button className="custom-primary mx-auto w-25" type="submit" onClick={props.onHide}>Add</Button>
          </Modal.Footer>
      </Form>
    </Modal>
  );
}


export default CreateUni;