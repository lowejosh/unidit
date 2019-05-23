import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import {createThread} from '../Database';

const AltCreateReview = (props) => {
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
          Write Review
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={() => {
      
        if (title && content && selectValue !== -1) {
          // createThread(title, content, props.uid, props.uname, props.categoryid);
          // console.log(title + " : " + content + " : " + props.uid + " : " + props.uname + " : " + props.categoryid);
        }
      }}>
          <Modal.Body>
                  {/* <Form.Label>Title</Form.Label> */}
                  <Form.Group>
                      <Form.Control onChange={(e) => {
                        setTitle(e.target.value);
                      }} className="mt-2" size="lg" type="text" placeholder={props.type + " ID"} />
                  </Form.Group>
                  <Form.Group>
                  {/* TODO */}
                      <Form.Control style={{color: "gray"}} value={selectValue} as="select" onChange={handleChange}>
                          <option style={{fontWeight: "bold"}} disabled value={-1} key={-1}>Relevant Faculty</option>
                          <option value={"Science, Engineering and Information Technology"} key={0}>Science and Engineering</option>
                          <option value={"Business, Economics & Law"} key={1}>Business, Economics & Law</option>
                          <option value={"Health and Behavioural Science"} key={2}>Health and Behavioural Science</option>
                          <option value={"Humanities and Social Sciences"} key={3}>Humanities and Social Science</option>
                          <option value={"Medicine"} key={4}>Medicine</option>

                     </Form.Control>
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


export default AltCreateReview;