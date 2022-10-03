const router = require('express').Router();
let Patient = require('../models/patients.model');
const mongoose = require('mongoose');
router.route('/').get((req, res) => {
  Patient.find()
    .then(patients => res.json(patients))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
  const { img,
          name,
          gender, 
          number, 
          lastVisit, 
          email, 
          birthDate, 
          house_no, 
          street, 
          city, 
          state,
          pincode, 
          prescription, 
          tags, 
          surface,
          pop,
          top,
          sensitivity,
          conclusion,
          complaint,
          findings,
          investigation,
          diagnosis,
          notes
        } = req.body;

  const newPatient = new Patient({ img, 
                                    name, 
                                    gender, 
                                    number, 
                                    lastVisit, 
                                    email, 
                                    birthDate, 
                                    house_no, 
                                    street, 
                                    city, 
                                    state, 
                                    pincode, 
                                    prescription, 
                                    surface,
                                    pop,
                                    top,
                                    sensitivity,
                                    conclusion,
                                    complaint,
                                    findings,
                                    investigation,
                                    diagnosis,
                                    tags,
                                    notes
                                   })

  newPatient.save()
    .then(() => res.json(newPatient))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
  Patient.findByIdAndDelete(req.params.id)
    .then(() => res.json('Patient deleted.'))
    .catch(err => res.status(400).json('Error: ' + err));
});
router.route('/:id').get((req, res) => {
  Patient.findById(req.params.id)
    .then(patients => res.json(patients))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').patch((req, res) => {
  Patient.findById(req.params.id)
    .then(patients => {
      patients.id = req.body.id;
      patients.img = req.body.img;
      patients.name = req.body.name;
      patients.gender = req.body.gender;
      patients.number = req.body.number;
      patients.lastVisit = req.body.lastVisit;
      patients.email = req.body.email;
      patients.birthDate = req.body.birthDate;
      patients.house_no = req.body.house_no;
      patients.street = req.body.street;
      patients.city = req.body.city;
      patients.state = req.body.state;
      patients.pincode = req.body.pincode;
      patients.surface = req.body.surface;
      patients.pop = req.body.pop;
      patients.top = req.body.top;
      patients.sensitivity = req.body.sensitivity;
      patients.conclusion = req.body.conclusion;
      patients.complaint = req.body.complaint;
      patients.investigation = req.body.investigation;
      patients.findings = req.body.findings;
      patients.diagnosis = req.body.diagnosis;
      patients.notes = req.body.notes;
      patients.price = req.body.price;
      patients.discount = req.body.discount;
      patients.totalprice = req.body.totalprice;
      patients.drug = req.body.drug;
      patients.am = req.body.am;
      patients.noon = req.body.noon;
      patients.pm = req.body.pm;
      patients.totalqty = req.body.totalqty;
      patients.food = req.body.food;
      patients.instruction = req.body.instruction;
      patients.save()
        .then(() => res.json(patients))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;