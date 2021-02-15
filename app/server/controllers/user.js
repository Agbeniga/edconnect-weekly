const express = require('express');
const user = require('../services/user');
const school = require('../services/school');
const router = express.Router();


router.get('/signup', (req, res) => {

    // add code to render the Home Component, and pass in the projects  

    // as a props
    const error = req.flash("error");
    const session = req.session.user;
    console.log(req.body);

    res.render('Signup',
        {
            years: JSON.stringify(school.getGradYears()),
            programs: JSON.stringify(school.getPrograms()),
            error: error,
            session:session
        });

});

router.post("/signup", (req, res) => {
    console.log(req.body);
    const [success, response] = user.create(req.body);
      console.log(response);

    if (success) {
        req.session.user = response;
        res.redirect("/");
    } else {
        req.flash("error", JSON.stringify(response));
        res.redirect("/signup");
    }
});




router.get('/login', (req, res) => {

    // add code to render the Home Component, and pass in the projects  

    // as a props
    const error = req.flash("error");
    const session = req.session.user;
    console.log(req.body);

    res.render('Login',
        {
            error: error,
            session:session
        });

});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const [success, response] = user.authenticate(email, password);
    console.log(req.body);
    if (success) {
        req.session.user = response;
        res.redirect("/");
    } else {
        req.flash("error", JSON.stringify(response));
        res.redirect("/login");
    }
});


module.exports = router;