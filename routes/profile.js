const express = require('express');
const router = express.Router();
const User = require('../models/user')


router.get('/', (req, res, next) => {
  console.log('im hereee')
  const { _id } = req.session.currentUser;
  User.findById(_id)
    .populate('guides')
    .then((user) => {
      res.json({ user });
    })
    .catch(next);
});

router.put('/', (req, res, next) => {

  const { _id } = req.session.currentUser;
  console.log(req.body)

  const { email, phone, expertise } = req.body;

  const userToUpdate = {
      email,
      phone,
      expertise,
  };
  console.log('user to update', userToUpdate)

  User.findByIdAndUpdate(_id, userToUpdate)
    .then((user) => {
      res.status(200);
      res.json({
        user,
      })
      .catch(next)
    })
});

module.exports = router;
