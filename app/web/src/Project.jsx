import { Link , useParams, useHistory} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {Card, Row, Col, ListGroup, ListGroupItem, Button, Form} from 'react-bootstrap';

const Project = () =>{
    const [fullName, setFullName] = useState();
    const [projectName, setProjectName] = useState();
    
    const [abstract, setabstract] = useState();
    const [authors, setAuthors] = useState();
    const [tags, setTags] = useState();
    const {id} = useParams();
    let history = useHistory();


    
 

    useEffect(()=>
    {
        const getProject = async () => {
            const res = await fetch(`/api/projects/${id}`);
            const projectData = await res.json();
            const userDataRes = await fetch(`/api/users/${projectData["createdBy"]}`);
            const userData = await userDataRes.json();
            const fullName = userData["firstname"] + " " + userData["lastname"];
            console.log(projectData);
            setFullName(fullName);
            setProjectName(projectData["name"]);
            setabstract(projectData["abstract"]);
            setAuthors(projectData["authors"]);
            setTags(projectData["tags"]);
        };
        getProject();
    }, []);

    function submitComment(){
        document.cookie = `uid=;path=/;expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
        history.push("/signup");
    }

    return (
    <div class="container">
        <h2 id="project_name">{projectName}</h2>
        <div class="jumbotron py-2 pl-1">
            <ul class="row align-items-center">
                <div class="col-3">
                    <li class="list-unstyled">Created By</li>
                    <li class="list-unstyled" id="project_author">{fullName}</li>
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
                    <Link to="editProject.html" class="btn btn-primary">
                
                        Edit Project
                    
                    </Link>
                </div>
            </ul>
        </div>

    <Row>
      <Col>
        <h2>Project Abstarct</h2>
        <hr/>
        <p id="project_abstract">
          {abstract}
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
       
               
        <Button variant="primary" type="submit" className="btn btn-primary" id="submitButton" onClick={submitComment}>Sign Up</Button>
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
                <ListGroupItem class="list-group-item">{authors}</ListGroupItem>
                {/* {authors.map((value)=>
                     (<ListGroupItem class="list-group-item" key={value}>{value}</ListGroupItem>)
                )} */}
         
            </ListGroup>
            <Card.Footer>
            <Card.Link >{tags}</Card.Link>
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
);
}

export default Project;