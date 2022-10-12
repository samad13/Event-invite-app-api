const Joi = require('joi');
const mongoose = require('mongoose');

const Event = mongoose.model('Event', new mongoose.Schema({
  eventName: {
    type: String,
    minlength: 3,
    maxlength: 50,
    required:true
},
  eventType: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20
  },
  eventDate: {// find how to select date from backend
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20
  },
  eventTime: { //find how to select time from backend
    type: String,
    required: true,
    minlength: 3,
    maxlength: 20
  },
  guestNumber: {
    type: Number,
    required: true,
    minlength: 1,
    maxlength: 100000
  }, 
  dateCreated:{
    type: Date,
    default: Date.now,
  }
}));


function validateEvent(event) {
  const schema = {
    eventName: Joi.string().min(3).max(20).required(),
    eventType: Joi.string().min(3).max(20).required(),
    eventDate: Joi.string().min(3).max(20).required(),
    eventTime: Joi.string().min(3).max(20).required(),
    guestNumber: Joi.number().min(1).max(100000).required()
  };

  return Joi.validate(event, schema);
 }

exports.Event = Event;
exports.validate = validateEvent;