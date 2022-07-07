const mongoose = require('mongoose');
const autoIncrement = require("mongoose-auto-increment");


const patientSchema = new mongoose.Schema({
  img: {type: String},
  name: {type: String, minlength: 3},
  lastName: {type: String, minlength: 3},
  fullname: {type: String, minlength: 3},
  gender: {type: String, trim: true, },
  number: {type: String, trim: true, maxlength: 10 },
  lastVisit: {type: String,trim: true},
  email: {type: String,trim: true},
  birthDate: {type: String,trim: true},
  house_no: {type: String},
  street: {type: String},
  city: {type: String},
  state: {type: String},
  pincode: {type: String},
}, {
});

autoIncrement.initialize(mongoose.connection);
patientSchema.plugin(autoIncrement.plugin, {
  model: "Patient", // collection or table name in which you want to apply auto increment
  field: "_id", // field of model which you want to auto increment
  startAt: 101, // start your auto increment value from 1
  incrementBy: 1, // incremented by 1
});

module.exports = mongoose.model("Patient", patientSchema);