const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();
const User = require('../db/query.js');

function validUser(user) {
  let validEmail = typeof user.email == 'string' &&
                    user.email.trim() != '';
  let validPassword = typeof user.password == 'string' &&
                        user.password.trim() != '' &&
                        user.password.trim().length > 5;
  return validEmail && validPassword;
}


router.post('/signup', (req, res, next) => {
  if (validUser(req.body)) {
    User
      .getUserByEmail(req.body.email)
      .then(user => {
        if (!user) {
          bcrypt.hash(req.body.password, 8)
            .then(hash => {
              const newUser = {
                email: req.body.email,
                password: hash,
              };
              User
                .createNewUser(newUser)
                .then(id => {
                  res.json({
                    id,
                    newUser
                  });
                });
            });
        } else {
          next(new Error('email already in use'));
        }
      });
  } else {
    next(new Error('invalid user information'));
  }
});


router.post('/login', (req, res, next) => {
  if (validUser(req.body)){
    User
      .getUserByEmail(req.body.email)
      .then(user => {
        if (user){
          bcrypt.compare(req.body.password, user.password)
                .then(result => {
                  if (result) {
                    res.json({
                      result,
                      message: 'logged in!!!'
                    });
                  } else {
                    next(new Error('invalid password'));
                  }
                });
        } else {
          next(new Error('invalid user'));
        }
      });
  } else {
    next(new Error('invalid login information'));
  }
});

module.exports = router;
