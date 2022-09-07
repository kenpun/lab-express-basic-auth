const router = require("express").Router();

function loginCheck() {
  return (req, res, next) => {
    // check if the user is logged in
    if (req.session.user !== undefined) {
      // the user is logged in
      // they can visit the page that they requested
      next()
    } else {
      // the user is not logged in
      // we redirect
      res.redirect('/auth/login')
    }
  }
}

/* GET home page */
router.get("/", (req, res, next) => {
  res.render("index");
});

router.get('/profile', loginCheck(), (req, res, next) => {
  // whenever you want to use use info in a view
  // these are the steps
  // access the logged in user  
  const username = req.session.user.username
  res.render('profile', { username: username})
});



module.exports = router;