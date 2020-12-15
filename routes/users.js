const express = require('express');
const router = express.Router();
require('../db/mongoose');
const User = require('../models/user');
const Address = require('../models/address');

/* Get all users */
router.get('/getusers', (req, res) => {
  User.find({})
    .then((users) => {
      res.send({ description: "OK", schema: users });
    })
    .catch((e) => {
      res.status(500).send();
    })
});

/* Create user */
router.post('/createUsers', (req, res) => {
  const user = new User(req.body)
  user.save()
    .then(() => {
      res.status(201).send({ description: "CREATED", schema: user });
    })
    .catch((e) => {
      res.status(405).send({ description: "Invalid input" });
    })
});

module.exports = router;
