import React, { useState } from 'react';
import { Form, Button, Col, FormControl } from 'react-bootstrap';
import Layout from './shared/Layout';


const FormGroup = (props) => {
    return (
        <>
            <Form.Group as={Col} >
                <Form.Label > {props.label}</Form.Label>
                <FormControl
                    id={props.id}
                    name={props.id}
                    type={props.type}
                    placeholder={props.placeholder}
                    size="lg"
                    value={props.value}
                    onChange={(event) => props.onChange(event.target.value)}
                    
                    required
                />
            </Form.Group>
        </>

    );
}

const  Error = (props) => {
    return <div className='alert alert-danger h3 small'>
        {props.errorText.map((value) => JSON.parse(value) + "<br>")}
    </div>  
}


const CreateProject = (props) => {
    const [projectNameInputValue, setProjectNameInputValue] = useState('');
    const [projectAbstractInputValue, setProjectAbstractInputValue] = useState('');
    const [authorsInputValue, setAuthorsInputValue] = useState('');
    const [tagInputValue, setTagInputValue] = useState('');
    
    return (
        <Layout session = {props.session}>
        <div className="container">
            <div className="w-50 mx-auto">
                <h2 id="createProjectTitle">Submit Project</h2>
                <div id="error">
                    { props.error.length === 0 ? <></> : <Error errorText={props.error} />}
                </div>
                <Form id="createProjectForm" method="post" action="/projects/submit">
                    <FormGroup name="name" controlId="Project-name" label="Project Name" id="name" placeholder="Enter project name" type="text" value={projectNameInputValue} onChange={setProjectNameInputValue}></FormGroup>
                    <Form.Group as={Col} controlId="comment">
                        <Form.Label>Project Abstract</Form.Label>
                        <textarea
                            className="form-control"
                            id=""
                            cols="30"
                            rows="3"
                            name="abstract"
                            value={projectAbstractInputValue} 
                            onChange={(event) => setProjectAbstractInputValue(event.target.value)}
                        >
                        </textarea>

                    </Form.Group>
                    <FormGroup controlId="Authors" name="authors" label="Authors" id="authors" placeholder="Enter authors names(seperated by comma)" type="text" value={authorsInputValue} onChange={setAuthorsInputValue}></FormGroup>
                    <FormGroup controlId="tag" name="tags" label="Tag(s)" id="tags" placeholder="use # to tag project with different topics(e.g #javascript #mongodb)" type="text" value={tagInputValue} onChange={setTagInputValue}></FormGroup>

                    <Button variant="primary" type="submit" className="btn btn-primary" id="createProjectButton">Continue</Button>
                </Form>

            </div>
        </div>
        </Layout>);

}

export default CreateProject;