const express = require('express');
const router = express.Router();
const Guide = require('../models/guide');

router.get('/', (req, res, next) => {

 Guide.find({})
   .then((guideList) => {
     res.status(200);
     console.log("hello" + guideList)
     res.json(guideList);
   })
   .catch(next)

});

router.post('/', (req, res, next) => {
    const { title, date, time, description, location, expertise, duration } = req.body;
   
    const newGuide = new Guide({
        title,
        date,
        time,
        description,
        location,
        expertise,
        duration
    });
   
    newGuide.save()
    .then((guide)=> {
      res.status(200)
      res.json({guide: newGuide})
    })
    .catch(next)
   });

module.exports = router;