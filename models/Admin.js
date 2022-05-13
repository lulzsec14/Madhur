const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    maxLength: [20, 'Name can not be longer than 20 characters!'],
    required: [true, 'Please provide Full Name of the User!'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide your Email Id'],
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide a valid email',
    ],
    minLength: 8,
    maxLength: 50,
  },
  password: {
    type: String,
    required: [true, 'Please provide a password!'],
    minLength: 8,
  },
  phoneNo: {
    type: String,
    unique: true,
    require: [true, 'Please provide your phone no!'],
    minLength: 8,
    maxLength: 12,
  },
  emailToken: {
    type: String,
  },
  emailTokenExpire: {
    type: Date,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordExpire: {
    type: Date,
  },
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;
