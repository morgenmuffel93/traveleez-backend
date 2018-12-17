const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
  username: String,
  email: String,
  password: String,
  phone: String,
  expertise: String,
  guides: [{
    type: ObjectId,
    ref: 'Guide'
  }],
  savedForLater: [{
    type: ObjectId,
    ref: 'Guide'
  }]
  }, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;