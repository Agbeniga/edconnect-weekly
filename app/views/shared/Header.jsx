import { Button, Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import React from 'react';

//      Navbar: Updates navbar if user has loged in
const CreateNavBarElement = (props) => {
   
    return <>
        <Nav className="ml-auto">
            <Nav.Link href="/logout" className=" text-white-50 small">logout</Nav.Link>
            <Nav.Link  className="text-white-50 small pr-0 mr-0" id="username">{`Hi, ${props.userName}`}</Nav.Link>
            
        </Nav>
    </>;
}

const Header = (props) => {
    
    return (
        <>
            <header>
                <Navbar bg="primary" variant="dark" expand="lg" className="mb-3">
                    <Navbar.Brand href="/" className="text-light "
                    >Project Explorer
                </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">

                        <Form inline>
                            <FormControl type="text" placeholder="Search Projects"
                                className=" mr-sm-2"
                                aria-label="Search" />
                            <Button variant="outline-light" type="search">Search</Button>

                        </Form>

                        <Nav>
                            <Nav.Link href="/projects" className="text-white-50">Projects</Nav.Link>
                            <Nav.Link href={props.session !== undefined ? "/projects/submit" : "/login" } className="nav-link text-white-50">Submit</Nav.Link>
                        </Nav>
                        {props.session !== undefined ?

                            <CreateNavBarElement userName={props.session.firstname} />
                            :
                            <>
                                <Nav className="ml-auto">
                                <Nav.Link href="/signup" className="nav-link text-white-50">Sign Up</Nav.Link>
                                    <Nav.Link href="/login" className="text-white-50">Login</Nav.Link>
                                    
                                </Nav>
                            </>
                        }

                    </Navbar.Collapse>
                </Navbar>
            </header>
        </>
    );

}

export default Header;






