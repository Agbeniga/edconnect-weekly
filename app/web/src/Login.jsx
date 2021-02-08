import React, { useState } from 'react';
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
        {props.errorText.map((value) => value)}
    </div>
    
}




const Login = () => {
    const [emailInputValue, setEmailInputValue] = useState('');
    const [passwordInputValue, setPasswordInputValue] = useState('');
    const [errorMessages, setErrorText] = useState([]);
    let history = useHistory();


    function onHandleSubmit(err) {
        document.cookie = `uid=;path=/;expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    fetch('/api/login',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "email": emailInputValue,
    
                "password": passwordInputValue,
            })
        }
    ).then(response => {
        if (response.ok) {
            return response.json();
        } else {
            response.json().then(errorText => {
                
                let errorMessage = ['Invalid email/password'];
                // setErrorText(errorText["errors"]);
                setErrorText(errorMessage);
            });
        }
    }).then(data => {
        let key = "uid";
        let value = data["data"]["id"];
        document.cookie = `${key}=${value};path=/;`;
        history.push("/");
    }).catch(e => {
        // console.log(e.message);
    });
    err.preventDefault();

    }



    return (
        <Layout>
        <div className="container">
            <div className="align-items-center text-left w-50 mx-auto">
                <h2 id="loginTitle">Login</h2>
                <div id="error">
                { errorMessages.length === 0 ? <></> : <Error errorText={errorMessages} />}
              
                </div>
                <Form id="loginForm" onSubmit={onHandleSubmit}>
                    <FormGroup controlId="email" label="Email" id="email" placeholder="Email Address" type="email" value={emailInputValue} onChange={setEmailInputValue}></FormGroup>
                    <FormGroup controlId="password" label="Password" id="password" placeholder="Your Password" type="password" value={passwordInputValue} onChange={setPasswordInputValue}></FormGroup>

                    <Button variant="primary" type="submit" className="btn btn-primary" id="loginButton">Login</Button>
                </Form>
            </div>
        </div>
        </Layout>
    );

}

export default Login;