const passport      = require('passport'), 
  LocalStrategy     = require('passport-local').Strategy;
const bcrypt        = require('bcrypt');
const Database      = require('./db-module');

exports.login = (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) { return next(err); }
    if (!user) {
      var errorMsg = "User credentials are invalid. Please try again.";
      return res.render('pages/login', { message: errorMsg });
    }
    req.logIn(user, (err) => {
      if (err) { return next(err); }
      // TODO: change to correct route when it is complete
      return res.redirect('/temp');
    });
  }) (req, res, next);
}

exports.signup = async (req, res) => {
  bcrypt.hash(req.body.password, 10, (err, hash) => {
    Database().query('SELECT id FROM users WHERE email=$1', [req.body.email], (err, result) => {
      if (result.rows[0]) {
        var errorMsg = "Email address has already been used. Please use another email."
        res.render('pages/signup', { message: errorMsg });
      } else {
        Database().query('INSERT INTO users (email, password) VALUES ($1, $2)', [req.body.email, hash], (err, result) => {
          if (err) {
            console.log(err);
          } else {
            res.redirect('/login?redirect=success');
          }
        });
      }
    })
  });
}

