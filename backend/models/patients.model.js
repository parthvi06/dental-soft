const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const patientSchema = new Schema({
  id: {type: String, unique: true},
  img: {type: String},
  name: {type: String, minlength: 3},
  lastName: {type: String, minlength: 3},
  fullname: {type: String, minlength: 3},
  gender: {type: String, trim: true, },
  number: {type: String, trim: true, maxlength: 10 },
  lastVisit: {type: String,trim: true},
  email: {type: String,trim: true},
  birthDate: {type: String,trim: true},
  street: {type: String},
  city: {type: String},
  state: {type: String},
  pincode: {type: String},
}, {
});


const Patient = mongoose.model('Patient',patientSchema);

module.exports = Patient;