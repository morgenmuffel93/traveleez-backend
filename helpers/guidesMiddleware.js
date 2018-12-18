'use strict';

const User = require('../models/user');

const guideMiddleware = {};

guideMiddleware.checkGuideUser = (req, res, next) => {
  const guideId = req.params.activityId;
  const { _id } = req.session.currentUser;
  User.findById(_id)
    .then((user) => {
      const userGuides = user.guides;
      if (userGuides.indexOf(guideId) < 0) {
        const err = new Error('Unauthorized');
        err.status = 403;
        err.statusMessage = 'Unauthorized';
        next(err);
      }
    })
    .catch(next);

  next();
};

module.exports = guideMiddleware;
