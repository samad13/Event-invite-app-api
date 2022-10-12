const Joi = require('joi');
const mongoose = require('mongoose');

const Contact = mongoose.model('Contact', new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required:true
},
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 50
  },
  
  phone: {
    type: Number,
    required: true,
    minlength: 8,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
}));

function validateContact(contact) {
  const schema = {
    event: Joi.objectId().min(2).max(50).required(),
    name: Joi.string().min(2).max(50).required(),
    phone: Joi.string().min(8).max(20).required(),
    email:  Joi.string().email().min(5).max(50).required(),
  };

  return Joi.validate(contact, schema);
}

exports.Contact = Contact; 
exports.validate = validateContact;
