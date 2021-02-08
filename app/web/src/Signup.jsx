import React, {useState, useEffect} from 'react';
import { Form, Button, Col, FormControl } from 'react-bootstrap';
import {useHistory} from 'react-router-dom';
import Layout from './shared/Layout';


const  Error = (props) => {
    return <div className='alert alert-danger h3 small'>
        {props.errorText.map((value) => value + "<br>")}
    </div>  
}


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

const FormSelect = (props) => {
    return (<>
        <Form.Group as={Col} controlId={props.controlId}>
            <Form.Label>{props.label}</Form.Label>
            <FormControl as="select" size="lg" value={props.value} onChange={props.onChange} >
                {props.options.map((value) => (
                    <option key={value}> {value} </option>
                    ))}
            </FormControl>
        </Form.Group>
    </>);
}


const Signup = () => {
    const [firstnameInputValue, setFirstnameInputValue] = useState('');
    const [lastnameInputValue, setLastNameInputValue] = useState('');
    const [emailInputValue, setEmailInputValue] = useState('');
    const [passwordInputValue, setPasswordInputValue] = useState('');
    const [programInputValue, setProgramInputValue] = useState('');
    const [matricNoInputValue, setMatricNoInputValue] = useState('');
    const [yearInputValue, setYearInputValue] = useState('');
    const [errorMessages, setErrorText] = useState([]);
    const [programs, setPrograms] = useState([]);
    const [years, setYears] = useState([]);

    let history = useHistory();

    useEffect(()=>{
        loadPrograms();
        loadYears();

    },[]);

    function loadPrograms() {
        fetch('/api/programs').then(
            response => {
                response.json().then(function (data) {
                    setPrograms(data);
                });
            }
        );
    }
    
    function loadYears() {
        fetch('/api/graduationYears').then(
            response => {
                response.json().then(function (data) {
                    setYears(data);
                });
            }
        );
    }

    function onHandleSubmit(err) {
        document.cookie = `uid=;path=/;expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
        fetch('/api/register',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    "firstname": firstnameInputValue,
    
                    "lastname": lastnameInputValue,
    
                    "email": emailInputValue,
    
                    "password": passwordInputValue,
    
                    "matricNumber": matricNoInputValue,
    
                    "program": programInputValue,
    
                    "graduationYear": yearInputValue,
                })
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
            let key = "uid";
            let value = data["data"]["id"];
            document.cookie = `${key}=${value};path=/;`;
            history.push("/");
        }).catch(e => {
        });
        err.preventDefault();
    }
    return (
        <Layout>
            <div className="container">
                <div className="w-75 mx-auto">
                    <h2 id="signupTitle">Sign Up</h2>
                    <div id="error">
                    { errorMessages.length === 0 ? <></> : <Error errorText={errorMessages} />}
                    </div>
                    <Form id="signupForm" onSubmit={onHandleSubmit}>
                        <Form.Row >
                            <FormGroup controlId="fname" label="First Name" id="firstName" placeholder="First name" type="text" value={firstnameInputValue} onChange={setFirstnameInputValue}></FormGroup>
                            <FormGroup controlId="lname" label="Last name" id="lastName" placeholder="Last name" type="text" value={lastnameInputValue} onChange={setLastNameInputValue}></FormGroup>
                        </Form.Row>
                        <Form.Row >
                            <FormGroup controlId="email" label="Email" id="email" placeholder="Email Address" type="email" value={emailInputValue} onChange={setEmailInputValue}></FormGroup>
                            <FormGroup controlId="password" label="Password" id="password" placeholder="Your Password" type="password" value={passwordInputValue} onChange={setPasswordInputValue}></FormGroup>
                        </Form.Row>


                        <Form.Row>
                            <Col>
                                <FormSelect controlId="program" label="Program" value={programInputValue} onChange={setProgramInputValue} options={programs}></FormSelect>

                            </Col>
                            <Col>
                                <Form.Row>
                                    <FormGroup controlId="matricNumber" label="Matric Number" id="matricNumber" placeholder="e.g 16/2020" type="text" value={matricNoInputValue} onChange={setMatricNoInputValue}></FormGroup>
                                    <FormSelect controlId="year" label="Year" value={yearInputValue} onChange={setYearInputValue} options={years}></FormSelect>

                                </Form.Row>
                            </Col>
                        </Form.Row>
                        <Button variant="primary" type="submit" className="btn btn-primary" id="submitButton">Sign Up</Button>
                    </Form>
                </div>

            </div>
        </Layout>);

}



export default Signup;