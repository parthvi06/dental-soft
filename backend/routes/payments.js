const router = require('express').Router();
let Payment = require('../models/payments.model');

router.route('/').get((req, res) => {
    Payment.find()
        .then(payments => res.json(payments))
        .catch(err => res.json(400).json('Error:' + err));
});

router.route('/').post((req, res) => {
    const {billNo, patient, doctor, billDate, charges, tax, discount, total } = req.body;
  
    const newPayment = new Payment({billNo, patient, doctor, billDate, charges, tax, discount, total })
  
    newPayment.save()
      .then(() => res.json(newPayment))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/:id').delete((req, res) => {
    Payment.findByIdAndDelete(req.params.id)
      .then(() => res.json('Payment deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
  router.route('/:id').patch((req, res) => {
    Payment.findById(req.params.id)
      .then(payments => {
        payments.billNo = req.body.billNo;
        payments.patient = req.body.patient;
        payments.doctor = req.body.doctor;
        payments.billDate = req.body.billDate;
        payments.charges = req.body.charges;
        payments.discount = req.body.discount;
        payments.tax = req.body.tax;
        payments.total = req.body.total;

        payments.save()
          .then(() => res.json(payments))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
module.exports = router;