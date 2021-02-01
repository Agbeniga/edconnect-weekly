import { Button, Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import { React, useState, useEffect } from 'react';
import {useHistory} from 'react-router-dom';






//      Navbar: Updates navbar if user has loged in
const CreateNavBarElement = (props) => {
    let history = useHistory();
    function logoutUser(parameter) {
        
        document.cookie = `uid=;path=/;expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
        history.push(parameter);
    }
    

    return <>
        <Nav className="ml-auto">
            <Nav.Link onClick={()=>logoutUser("/login")} className=" text-white-50 small">logout</Nav.Link>
            <Nav.Link  className="text-white-50 small pr-0 mr-0" id="username">{`Hi, ${props.userName}`}</Nav.Link>
            
        </Nav>
    </>;
}


const Header = () => {
    const [cookie, setCookie] = useState("");
    const [firstName, setfirstName] = useState("");
    let history = useHistory();


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

    useEffect(() => {

        setCookie(getCookie("uid"));



        if (cookie !== "") {
            fetch(`/api/users/${cookie}`).then(
                response => {
                    response.json().then(function (data) {
                        let userFirstName = data["firstname"];
                        setfirstName(userFirstName);


                    }).catch(e => {
                        console.log(e);
                    });
                }
            );
        }

        console.log(`cookie: ${cookie} firstname: ${firstName}`);

    });

    function logoutUser(parameter) {
        
        document.cookie = `uid=;path=/;expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
        history.push(parameter);
    }

    function createProject() {
        if(cookie !== ""){
            history.push("/projects/submit");
        }else{
            logoutUser("/login");

        }
        
        
    }
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
                            <Nav.Link onClick={()=>createProject()} className="nav-link text-white-50">Submit</Nav.Link>
                        </Nav>
                        {firstName !== "" ?

                            <CreateNavBarElement userName={firstName} />
                            :
                            <>
                                <Nav className="ml-auto">
                                    <Nav.Link onClick={()=>logoutUser("/login")} className="text-white-50">Login</Nav.Link>
                                    <Nav.Link onClick={()=>logoutUser("/signup")}  className="nav-link text-white-50">Register</Nav.Link>
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






