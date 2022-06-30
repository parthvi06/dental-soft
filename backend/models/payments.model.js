const moongose = require('mongoose');

const Schema = moongose.Schema;

const paymentSchema = new Schema({
  billNo: {type: String},
  patient: {type: String},
  charges: {type: String},
  billDate: {type: String},
  doctor: {type: String},
  tax: {type: String},
  discount: {type: String},
  total: {type: String},
  },{ 
});

const Payment = moongose.model('Payment', paymentSchema);

module.exports = Payment;