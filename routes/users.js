const express = require('express');
const router = express.Router();
require('../db/mongoose');
const User = require('../models/user');

/* Get all users */
router.get('/getusers', async (req, res) => {

  try {
    const users = await User.find({});
    res.send({ description: "OK", users });
  } catch (e) {
    res.status(500).send();
  }

});

/* Create user */
router.post('/createUsers', async (req, res) => {
  const user = new User(req.body);

  try {
    const result = await user.save();
    res.status(201).send({ description: "CREATED", result });
  } catch (e) {
    res.status(405).send({ description: "Invalid input" });
  }

});

/* Get one user */
router.get('/getusersById/:userId', async (req, res) => {
  const id = req.params.userId;

  try {
    const user = await User.findOne({ id });
    if (!user) {
      res.status(404).send({ description: "User not found" });
    } else {
      res.send({ description: "OK", user });
    }
  } catch (e) {
    res.status(400).send({ description: "Invalid user id" });
  }

});

/* Update one user */
router.put('/updateUsersById/:userId', async (req, res) => {
  const id = req.params.userId;
  const userDataToUpdate = req.body;

  try {
    const user = await User.findOneAndUpdate({ id }, userDataToUpdate, { new: true, runValidators: true });
    if (!user) {
      res.status(404).send({ description: "User not found" });
    } else {
      res.send({ description: "OK", user });
    }
  } catch (e) {
    res.status(400).send({ description: "Invalid user id" });
  }

});

/* Delete one user */
router.delete('/deleteUsersById/:userId', async (req, res) => {
  const id = req.params.userId;

  try {
    const user = await User.findOneAndDelete({ id });
    if (!user) {
      res.status(404).send({ description: "User not found" });
    } else {
      res.send({ description: "OK", user });
    }
  } catch (e) {
    res.status(400).send({ description: "Invalid user id" });
  }

});

module.exports = router;