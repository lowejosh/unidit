import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import {createThread} from './../Database';

const AltCreateThread = (props) => {
  const [selectValue, setSelectValue] = useState(-1); 
  const [title, setTitle] = useState(); 
  const [content, setContent] = useState(); 

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
          Create Thread
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={() => {
      
        if (title && content) {
          createThread(title, content, props.uid, props.uname, props.categoryid);
          // console.log(title + " : " + content + " : " + props.uid + " : " + props.uname + " : " + props.categoryid);
        }
      }}>
          <Modal.Body>
                  {/* <Form.Label>Title</Form.Label> */}
                  <Form.Group>
                      <Form.Control onChange={(e) => {
                        setTitle(e.target.value);
                      }} className="mt-2" size="lg" type="text" placeholder="Title" />
                  </Form.Group>
                  <Form.Group>
                  {/* <Form.Label>Content</Form.Label> */}
                  <Form.Control as="textarea" placeholder="Content" rows="4" onChange={(e) => {
                    setContent(e.target.value);
                  }} />
                  </Form.Group>
          </Modal.Body>
          <Modal.Footer>
          <Button className="custom-primary mx-auto w-25" type="submit">Post</Button>
          </Modal.Footer>
      </Form>
    </Modal>
  );
}


export default AltCreateThread;