const express = require('express');
const project = require('../services/project');
const router = express.Router();


router.get('/', (req, res) => {

    // add code to render the Home Component, and pass in the projects  

    // as a props
    const session = req.session.user;
    res.render('Home', {
        session: session,
        projects: JSON.stringify(project.getAll())
    });

});

router.get('/logout', (req, res) => {

    // add code to render the Home Component, and pass in the projects  

    // as a props
    req.session.destroy();
    res.redirect('/');

});


module.exports = router;