const express = require('express');
const router = express.Router();
const Guide = require('../models/guide');
const User = require('../models/user');
const guideMiddleware = require('../helpers/guidesMiddleware');
const { isLoggedIn } = require('../helpers/middlewares');

router.get('/', isLoggedIn(), (req, res, next) => {
  //----##### find all guides ####--// 
  Guide.find({})
    .then((guideList) => {
      res.status(200);
      res.json(guideList);
    })
    .catch(next)

});


router.post('/', isLoggedIn(), (req, res, next) => {
  const { title, date, time, description, location} = req.body;

  const { _id } = req.session.currentUser;

  const newGuide = new Guide({
    title,
    date,
    time,
    description,
    location,
  });

  console.log(newGuide)
  const updateUserPromise = User.findByIdAndUpdate(_id, { $push: { guides: newGuide._id } });
  const saveGuidePromise = newGuide.save();

  Promise.all([updateUserPromise, saveGuidePromise])
    .then((response) => {
      res.status(200)
      return res.json({ response })
    })
    .catch(next)
});


//----##### update guides ####--// 

router.get('/edit/:id', isLoggedIn(), guideMiddleware.checkGuideUser, (req, res, next) => {
  const { id } = req.params;

  Guide.findById(id)
    .then((guide) => {
      res.status(200);
      res.json(guide);
    })
    .catch(next)
});

router.put('/edit/:id', isLoggedIn(), guideMiddleware.checkGuideUser, (req, res, next) => {

  const { id } = req.params;
  const { title, date, time, description, location, expertise, duration } = req.body;
  const guideToUpdate = {
    title,
    date,
    time,
    description,
    location,
    expertise,
    duration
  };

  Guide.findByIdAndUpdate(id, guideToUpdate)
    .then((guide) => {
      res.status(200);
      res.json({
        message: "updated",
        guide,
      })
        .catch(next)
    })
});

//----##### delete guides ####--// 

router.delete('/delete/:id', isLoggedIn(), guideMiddleware.checkGuideUser, (req, res, next) => {
  const { id } = req.params;

  Guide.findByIdAndDelete(id)
    .then((guide) => {
      res.status(200);
      res.json({
        message: "deleted",
        guide
      });
    })
    .catch(next)

});

router.get('/:id', isLoggedIn(), (req, res, next) => {
  const guideId = req.params.id;

  Guide.findById({ _id: guideId })
    .populate('owner')
    .then((guide) => {
      User.find({ guides: guide._id})
        .then((user) => {
          res.json({ guide, user });
        });
    })
    .catch(next);
});

module.exports = router;
