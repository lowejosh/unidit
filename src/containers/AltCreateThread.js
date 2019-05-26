import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import {createThread} from './../Database';
import { setTokenSourceMapRange } from 'typescript';

const AltCreateThread = (props) => {
  const [selectValue, setSelectValue] = useState(-1); 
  const [title, setTitle] = useState(); 
  const [content, setContent] = useState(); 
  const [TOS, setTOS] = useState(null);

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
      
        if (title && content && TOS !== null) {
          alert ("Thanks for posting! As it is your first time creating a thread, you are the only one who can see your post until it is approved by moderators.");
          createThread(title, content, props.uid, props.uname, props.categoryid);
        } else {
          alert ("Please fill in all the forms and try again");
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
                  <Form.Group controlId="formBasicChecbox">
                    <Form.Check className="mx-2" onChange={(e) => {
                      setTOS(e.target.value);  
                    }} type="checkbox" label="I have read and will abide by the forum rules" />
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