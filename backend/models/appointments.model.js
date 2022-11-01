const moongose = require('mongoose');

const Schema = moongose.Schema;

const appointmentSchema = new Schema({
  title: {type: String},
  treatment: {type: String},
  start: {type: String},
  end: {type: String},
  backgroundColor: {type: String},
  textColor: {type: String},
  email:{ type: String}
  },
  { timestamps: true,
});

const Appointment = moongose.model('Appointment', appointmentSchema);

module.exports = Appointment;