import {React} from 'react';
import { Route, Switch } from 'react-router-dom';

import Home from '../Home.jsx';
import CreateProject from '../CreateProject.jsx';
import Login from '../Login.jsx';
import Project from '../Project.jsx';
import Signup from '../Signup.jsx';

const Layout = () => {
    return (
        <Switch>
            <Route exact path="/">
                <Home />
            </Route>
            <Route path="/signup">
                <Signup />
            </Route>
            <Route path="/login">
                <Login />
            </Route>
            <Route path="/projects/submit">
                <CreateProject />
            </Route>
            <Route path="/projects/:id">
                <Project />
            </Route>
        </Switch>);

}

export default Layout;