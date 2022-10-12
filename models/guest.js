const mongoose = require('mongoose');
const Joi = require("joi");


const Guest = mongoose.model('Guest', new mongoose.Schema({
invitation: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Invite',
  required:true
},
contact: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'Contact',
  required:true
},
  firstName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  
  surName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  title: {
    type: String,
    required: true
  },
  seatNumber: {
    type: Number,
  },
  picture: {
    type: String,
    required: true
  }
}));

function validateGuest(guest) {
    const schema = {
    invitation:Joi.objectId().min(2).max(50).required(),
    contact:Joi.objectId().min(2).max(50).required(),
    title:  Joi.string().min(2).max(10).required(),
    firstname: Joi.string().min(2).max(50).required(),
    surname: Joi.string().min(2).max(50).required(),
    seatnumber:Joi.number().min(1).max(100000).required(),
    picture:Joi.string().required(),
    };
  
    return Joi.validate(guest, schema);
  }


exports.Guest = Guest;
exports.validate = validateGuest;