import React, { useState , useEffect} from 'react';
import { Form, Button, Col, FormControl } from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
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
        {props.errorText.map((value) => value + "<br>")}
    </div>  
}


const CreateProject = () => {
    const [projectNameInputValue, setProjectNameInputValue] = useState('');
    const [projectAbstractInputValue, setProjectAbstractInputValue] = useState('');
    const [authorsInputValue, setAuthorsInputValue] = useState('');
    const [tagInputValue, setTagInputValue] = useState('');
    const [errorMessages, setErrorText] = useState([]);
    let history = useHistory();


    function onHandleSubmit(evnt) {
        fetch('/api/projects',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(
                {
                    "name": projectNameInputValue,

                    "abstract": projectAbstractInputValue,

                    "authors": authorsInputValue.split(","),

                    "tags": tagInputValue.split(","),
                },
            ),
        }
    ).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            response.json().then(errorText => {
                setErrorText(errorText["errors"]);
                throw Error("Bad request");
            });
        }
    }).then(data => {
        history.push("/");
    }).catch(e => {
        // console.log(e);
    });
    evnt.preventDefault();
}

    useEffect(()=> {
        function getCookie(cname) {
            var name = cname + "=";
            var decodedCookie = decodeURIComponent(document.cookie);
            var ca = decodedCookie.split(';');
            for (var i = 0; i < ca.length; i++) {
                var c = ca[i];
                while (c.charAt(0) === ' ') {
                    c = c.substring(1);
                }
                if (c.indexOf(name) === 0) {
                    return c.substring(name.length, c.length);
                }
            }
            return "";
        }
            if(getCookie("uid") === ""){
                history.push("/login");
            }
    },[]);

    return (
        <Layout>
        <div className="container">
            <div className="w-50 mx-auto">
                <h2 id="createProjectTitle">Submit Project</h2>
                <div id="error">
                    { errorMessages.length === 0 ? <></> : <Error errorText={errorMessages} />}
                </div>
                <Form id="createProjectForm" onSubmit={onHandleSubmit}>
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