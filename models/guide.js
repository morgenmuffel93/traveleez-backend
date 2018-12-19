const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectID = Schema.Types.ObjectId;

const guideSchema = new Schema({
  title: String,
  date: String,
  time: String,
  description: String,
  location: String,
});

const Guide = mongoose.model('Guide', guideSchema);

module.exports = Guide;
