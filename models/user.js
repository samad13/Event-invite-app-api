// const Joi = require('joi');
// const mongoose = require('mongoose');
// const {guestSchema} = require('./guest');


// const Event = mongoose.model('Event', new mongoose.Schema({
//   eventName: {
//     type: String,
//     trim: true,
//     required: true,
//     minlength:3,
//     maxlength: 20
//   },
//   eventType: {
//     type: String,
//     trim: true,
//     required: true,
//     minlength:3,
//     maxlength: 20
//   },
//   eventDate: {
//     type: String,
//     trim: true,
//     required: true,
//     minlength:3,
//     maxlength: 20
//   },
//   eventTime: {
//     type: String,
//     trim: true,
//     required: true,
//     minlength:3,
//     maxlength: 20
//   },
//   guestNumber: {
//     type: Number,
//     trim: true,
//     required: true,
//     minlength:1,
//     maxlength: 100000
//   },
//   guest:{
//     type:guestSchema,
//     required: true

//   }
// }));

// //do it that everything in the event will link to each of the other schemas

// //link event schema to every other schema by puuting the word event inside other schema
// //so write it in other routes , this will make them link them together

// function validateEvent(event) {
//     const schema = {
//     eventName: Joi.string().min(3).max(20).required(),
//     eventType: Joi.string().min(3).max(20).required(),
//    eventDate: Joi.string().min(3).max(20).required(),
//     eventTime: Joi.string().min(3).max(20).required(),
//     guestNumber: Joi.number().min(1).max(100000).required()
//     };
  
//     return Joi.validate(event, schema);
// }

// exports.Event = Event;
// exports.validate = validateEvent;