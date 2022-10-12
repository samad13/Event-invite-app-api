const Joi = require('joi');
const mongoose = require('mongoose');


const inviteSchema = new mongoose.Schema({
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required:true
},
  invitation: {
    type: String,
    required: true,
    minlength:3,
    maxlength: 500
  },
  venue: {
    type: String,
    required: true,
    minlength:3,
    maxlength: 50
  },
  address: {
    type: String,
    required: true,
    minlength:3,
    maxlength: 30
  },
  date: {
    type: String,
    required: true,
    minlength:3,
    maxlength: 20
  },
  
  time: {
    type: String,
    required: true
  },
});
const Invite = mongoose.model('Invite', inviteSchema);

function validateInvite(invite) {
    const schema = {
    event: Joi.objectId().min(2).max(50).required(),
    invitation: Joi.string().min(2).max(500).required(),
    venue: Joi.string().min(2).max(50).required(),
    address:  Joi.string().min(2).max(500).required(),
    date:Joi.string().min(2).max(10).required(),
    time:Joi.string().min(2).max(10).required(),
    };
  
    return Joi.validate(invite, schema);
  }
// exports.inviteSchema = inviteSchema;
exports.Invite = Invite;
exports.validate = validateInvite;