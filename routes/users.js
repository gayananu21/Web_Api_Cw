/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable max-len */
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../Models/user');

const router = express.Router();

router.post('/', async (req, res) => {
  if (!req.body.name) {
    // return res.status(400).send("Bad Request: Please add avenger name");
  }

  // use this for check password. Because when we bcrypt password size get incresed threfore we canot identify its minmum length or empty password.
  const validatePassword = new User({

    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,

  });

  try {
    await validatePassword.validate();
  } catch (err) {
    for (password in err.errors) {
      console.log(err.errors[password].message);
      return res.status(400).json({
        success: false,
        error: err.errors[password].message,
      });
    }
  }

  const salt = await bcrypt.genSalt(10);
  const hashedPw = await bcrypt.hash(req.body.password, salt);

  let user = new User({

    userName: req.body.userName,
    email: req.body.email,
    password: hashedPw,

  });

  try {
    user = await user.save();
    req.body.password;
    return res.send({
      userName: user.userName,
      email: user.email,
    });
  } catch (err) {
    for (userName in err.errors) {
      console.log(err.errors[userName].message);
      return res.status(400).json({
        success: false,
        error: err.errors[userName].message,
      });
      // return res.status(400).send(err.errors[name].message);
    }
    for (email in err.errors) {
      console.log(err.errors[email].message);
      return res.status(400).json({
        success: false,
        error: err.errors[email].message,
      });
    }
    for (password in err.errors) {
      console.log(err.errors[password].message);
      return res.status(400).json({
        success: false,
        error: err.errors[password].message,
      });
    }
  }
});

module.exports = router;
