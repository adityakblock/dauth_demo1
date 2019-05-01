const router = require('express').Router();
const dauth = require('dauth-verifier');
const passport = require('passport');

const options = {
  maxAge: 1000 * 60 * 60, // would expire after 60 minutes
  httpOnly: true, // The cookie only accessible by the web server
};

// Models
const User = require('../models/User');

router.get('/users/signin', (req, res) => {
  res.render('users/signin');
});

router.get('/users/sign', (req, res) => {
  const username = req.query.username;
  const email = req.query.email;
  const dob = res.dob;
  const code = req.query.code;
  const hashcode = req.query.hashcode;

  if (username != undefined) {
    console.log(username);
    dauth
      .verify(username, code, hashcode, email, dob)
      .then(async (data) => {
        console.log(data);
        const user = await User.findOne({ "username": username });
        if (user) {
          console.log(`Jel ${user._id}`);
          res.cookie('id3', String(user._id), options);
          return res.redirect('/notes');
        }
        const newUser = new User({ username });
        await newUser.save();
        console.log(`Jelo ${newUser._id}`);
        res.cookie('id3', String(newUser._id), options);
        return res.redirect('/notes');
      })
      .catch((error) => {
        console.log(error);
        console.log('Fail');
      });
  }
});

router.get('/users/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'You are logged out now.');
  res.redirect('/users/signin');
});

router.get(
  '/users/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/users/google/callback',
  passport.authenticate('google', {
    successRedirect: '/notes',
    failureRedirect: '/',
  })
);

module.exports = router;
