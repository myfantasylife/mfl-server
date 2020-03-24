const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  content: { type: String, required: true },
  user: { type: String, required: true },
  date: { type: Date, required: true }
});

module.exports = mongoose.model('Post', postSchema);