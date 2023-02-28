const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const detailSchema = new Schema({
    first: {type: String},
    details:[{
        name:{type: String},
        
    }]
    
    },{ 
  });
  
  const Detail = moongose.model('Detail', paymentSchema);
  
  module.exports = Detail;