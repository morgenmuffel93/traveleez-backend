const express = require('express');
const router = express.Router();
const User = require('../models/user');

// router.get('/', authMiddleware.requireUser, (req, res, next) => {
//   const { _id } = req.session.currentUser;
//   User.findById(_id)
//     .populate('savedForLater')
//     .then((user) => {
//       res.render('favourites/list-favourites', { user });
//     })
//     .catch(next);
// });

router.post('/add-delete/:guideId', (req, res, next) => {
  const userId = req.session.currentUser;
  const guideId = req.params.guideId;

  User.findById(userId)
    .then((user) => {
      const userSaved = user.savedForLater;
      if (userSaved.indexOf(guideId) < 0) {
        User.findByIdAndUpdate(userId, { $push: { savedForLater: guideId } })
          .then(() => {
            return res.json({ status: 'added' });
          });
          
      } else {
        User.findByIdAndUpdate(userId, { $pull: { savedForLater: guideId } })
          .then(() => {
            return res.json({ status: 'deleted' });
          });
      }
    })
    .catch(next);
});

module.exports = router;
