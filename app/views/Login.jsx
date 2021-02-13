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
        {props.errorText.map((value) => JSON.parse(value))}
    </div>
    
}




const Login = (props) => {
    const [emailInputValue, setEmailInputValue] = useState(props.error.length !== 0 ? props.message["email"] : '');
    const [passwordInputValue, setPasswordInputValue] = useState(props.error.length !== 0 ?props.message["password"] : '');
    



    return (
        <Layout session={props.session}>
        <div className="container">
            <div className="align-items-center text-left w-50 mx-auto">
                <h2 id="loginTitle">Login</h2>
                <div id="error">
                

                { props.error.length === 0 ? <></> : <Error errorText={props.error} />}
              
                </div>
                <Form id="loginForm" method="post" action="login">
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