'use strict';

const User = require('../models/user');

const guideMiddleware = {};

guideMiddleware.checkGuideUser = (req, res, next) => {
  const guideId = req.params.id;
  const { _id } = req.session.currentUser;
  User.findById(_id)
    .then((user) => {
      const userGuides = user.guides;
      if (userGuides.indexOf(guideId) < 0) {
        return res.status(401).json({
          error: 'Oops! Nothing to see here.'
        });
      }
    })
    .catch(next);

  next();
};

module.exports = guideMiddleware;
