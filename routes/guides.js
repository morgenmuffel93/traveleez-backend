const express = require('express');
const router = express.Router();
const Guide = require('../models/guide');

router.get('/', (req, res, next) => {
        //----##### find all guides ####--// 
 Guide.find({})
   .then((guideList) => {
     res.status(200);
     res.json(guideList);
   })
   .catch(next)

});

        //----##### create guide ####--// 
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
    .then((response) => {
      res.status(200)
        return res.json({response})
    })
    .catch(next)
   });
//----##### update guides ####--// 

router.get('/edit/:id', (req, res, next) => {
    console.log("im here")
    const { id } = req.params;
    
    Guide.findById(id)
        .then((guide) => {
        res.status(200);
        res.json(guide);
        })
        .catch(next)
});

router.put('/edit/:id', (req, res, next) => {
    console.log("im here")

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

router.delete('/delete/:id', (req, res, next) => {
  const { id } = req.params;
  
  Guide.findByIdAndDelete(id)
    .then((guide) => {
      res.status(200);
      res.json({ 
        message: "deleted",
        guide });
      })
      .catch(next)
  
  });
module.exports = router;
