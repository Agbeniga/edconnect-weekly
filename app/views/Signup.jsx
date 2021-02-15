import React, {useState} from 'react';
import { Form, Button, Col, FormControl } from 'react-bootstrap';
import Layout from './shared/Layout';


const  Error = (props) => {
    return <div className='alert alert-danger h3 small'>
        {props.errorText.map((value) => (
                    <p key={value}> {value} </p>
                    ))}
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
            <FormControl as="select" size="lg" value={props.value} onChange={props.onChange} name={props.name}>
                {props.options.map((value) => (
                    <option key={value}> {value} </option>
                    ))}
            </FormControl>
        </Form.Group>
    </>);
}


const Signup = (props) => {
    const [firstnameInputValue, setFirstnameInputValue] = useState('');
    const [lastnameInputValue, setLastNameInputValue] = useState('');
    const [emailInputValue, setEmailInputValue] = useState('');
    const [passwordInputValue, setPasswordInputValue] = useState('');
    const [programInputValue, setProgramInputValue] = useState('');
    const [matricNoInputValue, setMatricNoInputValue] = useState('');
    const [yearInputValue, setYearInputValue] = useState('');
    const programs = JSON.parse(props.programs);
    const years = JSON.parse(props.years);
    

    return (
        <Layout session = {props.session}>
            <div className="container">
                <div className="w-75 mx-auto">
                    <h2 id="signupTitle">Sign Up</h2>
                    <div id="error">
                    { props.error.length === 0 ? <></> : <Error errorText={JSON.parse(props.error)} />}
                    </div>
                    <Form id="signupForm" method="post" action="signup">
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
                                <FormSelect controlId="program" name="program" label="Program" value={programInputValue} onChange={setProgramInputValue} options={programs}></FormSelect>

                            </Col>
                            <Col>
                                <Form.Row>
                                    <FormGroup controlId="matricNumber" label="Matric Number" id="matricNumber" placeholder="e.g 16/2020" type="text" value={matricNoInputValue} onChange={setMatricNoInputValue}></FormGroup>
                                    <FormSelect controlId="year" name="graduationYear" label="Year" value={yearInputValue} onChange={setYearInputValue} options={years}></FormSelect>

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