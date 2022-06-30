const router = require('express').Router();
let Appointment = require('../models/appointments.model');

router.route('/').get((req, res) => {
    Appointment.find()
        .then(appointments => res.json(appointments))
        .catch(err => res.json(400).json('Error:' + err));
});

router.route('/').post((req, res) => {
    const {img, title, number, email, start, fromTo, injury, doctor,from, to,date } = req.body;
  
    const newAppointment = new Appointment({img, title, number, email, start, fromTo, injury, doctor,from, to, date })
  
    newAppointment.save()
      .then(() => res.json(newAppointment))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/:id').delete((req, res) => {
    Appointment.findByIdAndDelete(req.params.id)
      .then(() => res.json('Appointment deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').patch((req, res) => {
    Appointment.findById(req.params.id)
      .then(appointments => {
        appointments.title = req.body.title;
        appointments.img = req.body.img;
        appointments.number = req.body.number;
        appointments.email = req.body.email;
        appointments.start = req.body.start;
        appointments.fromTo = req.body.fromTo;
        appointments.injury = req.body.injury;
        appointments.doctor = req.body.doctor;
        appointments.from = req.body.from;
        appointments.to = req.body.to;
        appointments.date = req.body.date;

        appointments.save()
          .then(() => res.json(appointments))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
module.exports = router;