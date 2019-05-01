const GoogleStrategy = require('passport-google-oauth20').Strategy;

const User = require('../models/User');
const options = {
  maxAge: 1000 * 60 * 60, // would expire after 60 minutes
  httpOnly: true, // The cookie only accessible by the web server
};

module.exports = (passport, config) => {
  /**
   * passport session setup
   * serialize is used
   */
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

    /**
   * passport strategy for google login
   */
  passport.use(
    new GoogleStrategy(
      {
        clientID: config.googleAuth.clientID,
        clientSecret: config.googleAuth.clientSecret,
        callbackURL: config.googleAuth.callbackURL
      },
      (token, refreshToken, profile, done) => {
        process.nextTick(() => {
          User.findOne({ googleId: profile.id }, (err, user) => {
            if (err) return done(err);
            if (!user) {
              let newUser = new User();
              newUser.google.id = profile.id;
              newUser.google.token = token;
              newUser.google.name = profile.displayName;
              newUser.google.email = profile.emails[0].value;
              res.cookie('id3', String(newUser._id), options);
              newUser.save(err => {
                if (err) console.log(err);
                return done(null, newUser);
              });
            } else {
              return done(null, user);
            }
          });
        });
      }
    )
  );
}
