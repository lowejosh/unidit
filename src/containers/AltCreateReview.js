import React, {useState} from 'react';
import {Modal, Button, Form} from 'react-bootstrap';
import {createRating} from '../Database';
import StarRatings from 'react-star-ratings';

const AltCreateReview = (props) => {
  const [selectValue, setSelectValue] = useState(-1); 
  const [id, setId] = useState(); 
  const [name, setName] = useState(); 
  const [content, setContent] = useState(); 
  const [rating, setRating] = useState(); 

  const handleChange = (e) => {
    setSelectValue(e.target.value);
  }

  const changeRating = (newRating, name) => {
    setRating(newRating);
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
      
        if (id && name && selectValue !== -1 && rating) {
          console.log(id + " : " + name + " : " + content + " : " + selectValue + " : " + rating);
          createRating(content, props.uid, props.uname, props.categoryid, id, name, rating, selectValue)
        } else {
          alert ("Please fill in all the forms and try again");
        }
      }}>
          <Modal.Body>
                  {/* <Form.Label>Title</Form.Label> */}
                  <Form.Group>
                      <Form.Control onChange={(e) => {
                        setId(e.target.value);
                      }} className="mt-2" size="md" type="text" placeholder={props.type + " ID"} />
                  </Form.Group>
                  <Form.Group>
                      <Form.Control onChange={(e) => {
                        setName(e.target.value);
                      }} className="mt-2" size="md" type="text" placeholder={props.type + " Name"} />
                  </Form.Group>
                  <Form.Group>
                  {/* TODO */}
                      <Form.Control style={{color: "gray"}} value={selectValue} as="select" onChange={handleChange}>
                          <option style={{fontWeight: "bold"}} disabled value={-1} key={-1}>Faculty</option>
                          <option value={"Science, Engineering & Information Technology"} key={0}>Science, Engineering & Information Technology</option>
                          <option value={"Business, Economics & Law"} key={1}>Business, Economics & Law</option>
                          <option value={"Health and Behavioural Science"} key={2}>Health & Behavioural Science</option>
                          <option value={"Humanities and Social Sciences"} key={3}>Humanities & Social Science</option>
                          <option value={"Medicine"} key={4}>Medicine</option>
                     </Form.Control>
                  </Form.Group>
                  <Form.Group>
                  {/* <Form.Label>Content</Form.Label> */}
                  <Form.Control as="textarea" placeholder="Content (optional)" rows="4" onChange={(e) => {
                    setContent(e.target.value);
                  }} />
                  </Form.Group>
                  <div className="mb-5">

                  <div style={{position: "absolute", left: "calc(50% - 104px)"}}>
                      <StarRatings
                        rating={rating}
                        starRatedColor="#1E2248"
                        starDimension="30px"
                        starHoverColor="16122C"
                        changeRating={changeRating}
                        numberOfStars={5}
                        name='rating'
                      />
                  </div>
                  </div>

          </Modal.Body>
          <Modal.Footer>
          <Button className="custom-primary mx-auto w-25" type="submit">Review</Button>
          </Modal.Footer>
      </Form>
    </Modal>
  );
}


export default AltCreateReview;