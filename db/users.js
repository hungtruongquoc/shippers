/**
 * Created by hungtruong on 3/2/17.
 */
const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

let userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 3,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    require: true,
    minlength: 8
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

userSchema.methods.toJSON = function() {
  return _.pick(this.toObject(), ['_id', 'email']);
};

userSchema.methods.generateAuthToken = function() {
    let access = 'authenticate';
    let token = jwt.sign({_id: this._id.toHexString(), access}, 'shippers').toString();
    this.tokens.push({
      access,
      token
    });
    return this.save().then(() => {
      return token;
    });
  };

let User = mongoose.model('users', userSchema);

module.exports = {User};
