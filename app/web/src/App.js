import {React} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './Home.jsx';
import CreateProject from './CreateProject.jsx';
import Login from './Login.jsx';
import Project from './Project.jsx';
import Signup from './Signup.jsx';





function App() {
  return (
    <Router>
      <Switch>
            <Route exact={true} path="/" component={Home}/>
                
            <Route path="/signup" component={Signup}/>
            
            <Route path="/login" component={Login}/>
              
            <Route path="/projects/submit" component={CreateProject}/>
              
            <Route path="/projects/:id" component={Project}/>
            
        </Switch>
    </Router>
  );
}

export default App;

