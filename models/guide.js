const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = Schema.Types.ObjectId;

const guideSchema = new Schema({
  title: String,
  date: String,
  time: String,
  description: String,
  location: String,
  expertise: String,
  duration: Number,
}, {
  userId: {
    type: ObjectID,
    ref: 'User'
  }
});

const Guide = mongoose.model('Guides', guideSchema);

module.exports = Guide;
