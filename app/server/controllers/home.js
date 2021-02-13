const express = require('express');
const project = require('../services/project');
const router = express.Router();


router.get('/', (req, res) => {

  const userSession = req.session.user;
  console.log(userSession);
  // add code to render the Home Component, and pass in the projects  
  res.render('Home', { projects: JSON.stringify(project.getAll()), session:userSession });
  // res.render('Login');
  // as a props
});



router.get('/logout', (req, res) => {

  // add code to render the Home Component, and pass in the projects  
  req.session.destroy();
  res.redirect('/');
  // as a props
});

module.exports = router;

// console.log(typeof(JSON.stringify(project.getAll())));