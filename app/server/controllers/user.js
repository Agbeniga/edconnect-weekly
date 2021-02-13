const express = require('express');
const school = require('../services/school');
const user = require('../services/user');
const router = express.Router();


router.get('/signup', (req, res) => {
    const signinInputs = req.flash("signinMessge");
    const signinError = req.flash("error");

    // add code to render the Home Component, and pass in the projects  
    res.render('Signup',
        {
            years: JSON.stringify(school.getGradYears()),
            programs: JSON.stringify(school.getPrograms()),
            error: signinError, message: signinInputs
        });
    // as a props
});

router.post('/signup', (req, res) => {

    // add code to render the Home Component, and pass in the projects 

    req.flash("userSignin", JSON.stringify(req.body));
    const [success, response] = user.create(
        req.body
    );
    // console.log("Authentication status " + user.authenticate(email, password));
    if (success) {
        req.session.user = response;
        res.redirect('/');
    } else {
        req.flash("error", JSON.stringify(response));
        res.redirect('/signup');
    }

    // as a props
});

router.get('/login', (req, res) => {
    const loginInputs = req.flash("userLogin");
    const loginError = req.flash("error");
    console.log(loginInputs);
    // add code to render the Home Component, and pass in the projects  
    res.render('Login', { error: loginError, message: loginInputs });
    // as a props
});

router.post('/login', (req, res) => {

    // add code to render the Home Component, and pass in the projects  
    console.log(req.body);
    const { email, password } = req.body;

    req.flash("userLogin", JSON.stringify(req.body));
    const [success, response] = user.authenticate(email, password);
    console.log("Authentication status" + user.authenticate(email, password));
    if (success) {
        req.session.user = response;

        res.redirect('/');
    } else {
        req.flash("error", JSON.stringify(response));
        res.redirect('/login');
    }
    // as a props
});


module.exports = router;
