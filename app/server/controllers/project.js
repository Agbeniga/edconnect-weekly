const express = require('express');
const project = require('../services/project');
const user = require('../services/user');
const router = express.Router();


router.get('/projects/submit', (req, res) => {
    const userSession = req.session.user;
    const projectInputs = req.flash("projectMessge");
    const projectError = req.flash("error");

    console.log(projectInputs);
    // add code to render the Home Component, and pass in the projects  
    if (userSession) {
        res.render('CreateProject', { session: userSession, error: projectError, message: projectInputs });
    } else {
        res.redirect('/login');
    }
});





router.post('/projects/submit', (req, res) => {

    // add code to render the Home Component, and pass in the projects  
    console.log(req.body);
    const { name, abstract, authors, tags } = req.body;

    const body = JSON.stringify(req.body);
    req.flash("projectMessge", body);
    const [success, response] = project.create(name, abstract, authors.split(","), tags.split(","));

    if (success) {
        res.redirect('/');
    } else {
        req.flash("error", JSON.stringify(response));
        
        res.redirect('/projects/submit');
    }

});


router.get('/projects/:id', (req, res) => {

    const projectId = req.params.id;
    const _project = project.getById(projectId);
    const _user = user.getById(_project['createdBy']);
    // add code to render the Home Component, and pass in the projects  
    res.render('Project', { project: JSON.stringify(_project), user: JSON.stringify(_user) });
    // res.render('Login');
    // as a props
});



module.exports = router;
// const _project = project.getById('qqg8jtk5iso');
// const _user = user.getById(_project['createdBy']);
// console.log(_user);