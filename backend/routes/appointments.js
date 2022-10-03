const router = require('express').Router();
let Appointment = require('../models/appointments.model');

router.route('/').get((req, res) => {
    Appointment.find()
        .then(appointments => res.json(appointments))
        .catch(err => res.json(400).json('Error:' + err));
});

router.route('/').post((req, res) => {
    const { title,treatment, start, end, backgroundColor, textColor } = req.body;
  
    const newAppointment = new Appointment({title,treatment,start,end,backgroundColor, textColor })
  
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
        appointments.treatment = req.body.treatment;
        appointments.start = req.body.start;
        appointments.end = req.body.end;
        appointments.backgroundColor = req.body.backgroundColor;
        appointments.textColor = req.body.textColor;

        appointments.save()
          .then(() => res.json(appointments))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
module.exports = router;