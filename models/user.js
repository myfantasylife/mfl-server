const mongoose = require('mongoose');
const passwordHash = require('password-hash');
const jwt = require('jwt-simple');
const config = require('../config');

const userSchema = mongoose.Schema(
  {
    email: { 
      type: String, 
      lowercase: true, 
      trim: true, 
      unique: true,
      required: true 
    },
    password: { 
      type: String, 
      required: true 
    },
  },
  { 
    timestamps: { createdAt: "created_at" }
  }
);

userSchema.methods = {
  authenticate: password => {
    return passwordHash.verify(password, this.password)
  },
  getToken: () => {
    return jwt.encode(this, config.secret)
  }
};

module.exports = mongoose.model('User', userSchema);