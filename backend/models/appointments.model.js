const moongose = require('mongoose');

const Schema = moongose.Schema;

const appointmentSchema = new Schema({
  title: {type: String},
  img: {type: String},
  email: {type: String},
  number: {type: String},
  start: {type: String},
  date:{type: String},
  fromTo: {type: String},
  doctor: {type: String},
  injury: {type: String},
  from: {type: String},
  to: {type: String},
  },
  { timestamps: true,
});

const Appointment = moongose.model('Appointment', appointmentSchema);

module.exports = Appointment;