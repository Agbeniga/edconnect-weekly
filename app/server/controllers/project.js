const express = require('express');
const user = require('../services/user');
const project = require('../services/project');
const router = express.Router();


router.get('/projects/submit', (req, res) => {

    // add code to render the Home Component, and pass in the projects  

    // as a props
    const error = req.flash("error");
    const userSession = req.session.user;
    console.log(req.body);
    if(userSession){
    res.render('CreateProject',
        {
            session: userSession,
            error: error
        });
    }else{
        res.redirect('/login');
    }
});

router.post('/projects/submit', (req, res) => {
    const { name, abstract, authors, tags } = req.body;
    const userSession = req.session.user;
    const [success, response] = project.create({ name:name,
         abstract:abstract,
        authors:authors.split(','),
        tags:tags.split(','), 
        createdBy:userSession["firstName"] });
    console.log(req.body);
    if (success) {
        res.redirect("/");
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