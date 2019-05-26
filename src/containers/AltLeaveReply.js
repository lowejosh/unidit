import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import {createComment} from './../Database';

const AltCreateThread = (props) => {
  const [content, setContent] = useState(); 
  const [TOS, setTOS] = useState(null);

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header className="background-primary text-background" closeButton>
        <Modal.Title className="mx-auto" id="contained-modal-title-vcenter">
          Leave Reply
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={() => {
        console.log(content);
        if (content) {
          alert ("Thanks for posting! As it is your first time commenting, you are the only one who can see your post until it is approved by moderators.");
          createComment(content, props.uid, props.uname, props.threadid);
        } else {
          alert ("Please fill in all the forms and try again");
        }
      }}>
          <Modal.Body>
                  <Form.Group>
                  <Form.Control as="textarea" placeholder="Reply" rows="4" onChange={(e) => {
                    setContent(e.target.value);
                  }} />
                  </Form.Group>
                  <Form.Group controlId="formBasicChecbox">
                    <Form.Check className="mx-2" onChange={(e) => {
                      setTOS(e.target.value);  
                    }} type="checkbox" label="I have read and agree to abide by the forum rules" />
                  </Form.Group>
          </Modal.Body>
          <Modal.Footer>
          <Button className="custom-primary mx-auto w-25" type="submit">Reply</Button>
          </Modal.Footer>
      </Form>
    </Modal>
  );
}


export default AltCreateThread;