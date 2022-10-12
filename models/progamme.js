const Joi = require('joi')
const mongoose = require('mongoose');

const Programme = mongoose.model('Programme', new mongoose.Schema({
  invitation: {// change it later to evnet name
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Invite',
    required:true
},
  programme: {
    type:String,
    trim: true,
    required: true,
    minlength:3,
    maxlength: 50,
  },
  time: [{
    type: String,
    trim: true,
    required: true
  }]
  
  
}));


function validateProgram(programme) {
    const schema = {
        programme: Joi.array().items(Joi.string().min(2).max(50).required()),
        time: Joi.array().items(Joi.string().min(3).max(50).required())
   
    };
    
    return Joi.validate(programme, schema);
}


exports.Programme = Programme;
exports.validate = validateProgram;

