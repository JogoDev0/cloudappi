const express = require('express');
const router = express.Router();
require('../db/mongoose');
const User = require('../models/user');
const Address = require('../models/address');

/* Get all users */
router.get('/getusers', (req, res) => {
  User.find({})
    .then((users) => {
      res.send({ description: "OK", users });
    })
    .catch((e) => {
      res.status(500).send();
    })
});

/* Create user */
router.post('/createUsers', (req, res) => {
  const user = new User(req.body);
  user.save()
    .then(() => {
      res.status(201).send({ description: "CREATED", user });
    })
    .catch((e) => {
      res.status(405).send({ description: "Invalid input" });
    })
});

/* Get one user */
router.get('/getusersById/:userId', (req, res) => {
  const id = req.params.userId;
  User.findOne({ id: id })
    .then((user) => {
      if (!user) {
        res.status(404).send({ description: "User not found" });
      } else {
        res.send({ description: "OK", user });
      }
    })
    .catch((e) => {
      res.status(400).send({ description: "Invalid user id" });
    })
});

/* Update one user */
router.put('/updateUsersById/:userId', (req, res) => {
  const id = req.params.userId;
  const userDataToUpdate = req.body;

  User.findOneAndUpdate({ id: id }, userDataToUpdate, { new: true })
    .then((user) => {
      if (!user) {
        res.status(404).send({ description: "User not found" });
      } else {
        res.send({ description: "OK", user });
      }
    })
    .catch((e) => {
      res.status(400).send({ description: "Invalid user id" });
    })
});

/* Delete one user */
router.delete('/deleteUsersById/:userId', (req, res) => {
  const id = req.params.userId;
  User.findOneAndDelete({ id: id })
    .then((user) => {
      if (!user) {
        res.status(404).send({ description: "User not found" });
      } else {
        res.send({ description: "OK", user });
      }
    })
    .catch((e) => {
      res.status(400).send({ description: "Invalid user id" });
    })
});

module.exports = router;