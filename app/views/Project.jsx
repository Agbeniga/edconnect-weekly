import React from 'react';
import {Card, Row, Col, ListGroup, ListGroupItem, Button, Form} from 'react-bootstrap';
import Layout from './shared/Layout';

const Project = (props) =>{
    const project = JSON.parse(props.project);
    const user = JSON.parse(props.user);


    return (
        <Layout session={props.session}>
    <div class="container">
        <h2 id="project_name">{project['name']}</h2>
        <div class="jumbotron py-2 pl-1">
            <ul class="row align-items-center">
                <div class="col-3">
                    <li class="list-unstyled">Created By</li>
                    <li class="list-unstyled" id="project_author">{user['firstname']}</li>
                </div>
                <div class="col-3">
                    <li class="list-unstyled">
                        Date Created
                    </li>
                    <li class="list-unstyled">03/03/2020</li>
                </div>
                <div class="col-3">
                    <li class="list-unstyled">Last Updated</li>
                    <li class="list-unstyled">04/04/2020</li>
                </div>
                <div class="col-3">
                    <a href="editProject.html" class="btn btn-primary">
                
                        Edit Project
                    
                    </a>
                </div>
            </ul>
        </div>

    <Row>
      <Col>
        <h2>Project Abstarct</h2>
        <hr/>
        <p id="project_abstract">
          {project['abstract']}
        </p>
        <Form.Group as={Col} controlId="comment">
                <Form.Label for="comment"> Comments</Form.Label>
                <textarea
                            class="form-control"
                            id=""
                            cols="30"
                            rows="3"
                            name="Leave a comment"
                        >
                        </textarea>
               
            </Form.Group>
       
               
        <Button variant="primary" type="submit" className="btn btn-primary" id="submitButton" >Sign Up</Button>
        <hr/>
        <p className="text-center">No commets yet</p>
      </Col>
      <Col>
        
        <h2>
          Project Details
        </h2>
        <hr/>
        <Card className="mb-2">
           
                <Card.Header>Author(s)</Card.Header>
        
            <ListGroup>
                {/* {authors} */}
                <ListGroupItem class="list-group-item" id="project_authors">{project['authors'].join(", ")}</ListGroupItem>
                {/* {authors.map((value)=>
                     (<ListGroupItem class="list-group-item" key={value}>{value}</ListGroupItem>)
                )} */}
         
            </ListGroup>
            <Card.Footer>
            <Card.Link id="project_tags">{"#" + project['tags'].join(" #")}</Card.Link>
            {/* {tags.map((value)=>(
                     <Card.Link key={value}>{value}</Card.Link>
                     ))} */}
            </Card.Footer>               
        </Card>


        <Card>
            <ListGroup>
            <Card.Header>Project Files</Card.Header>
                <Card.Text className="text-center py-3">
                No File uploaded yet
                </Card.Text>
            </ListGroup>
        </Card>
    </Col>
    </Row>
</div>
</Layout>
);
}

export default Project;