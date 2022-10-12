const {Programme, validate } = require('../models/progamme');
const {Invite } = require('../models/invite');
const {Guest} = require('../models/guest'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const progammes = await Programme.find();
    res.send(progammes);
  });



//get by id
router.get('/:id', async (req, res) => {
  const programme = await Programme.findById(req.params.id).populate(["invitation", "guest"]);

  if (!programme ) return res.status(404).send('The programme ID was not found.');

  res.send(programme );
});



  router.post('/', async (req, res) => {
     const { error } = validate(req.body); 
     if (error) return res.status(400).send(error.details[0].message);

     const invite = await Invite.findById(req.body.invitation); 
    if (!invite) return res.status(400).send('invalid  invite');

    const guest = await Guest.findById(req.body.guest); 
    if (!guest) return res.status(400).send('invalid  guest');
  
    const progamme = new Programme({ 
      invitation: req.body.invitation,
      guest: req.body.guest,
        programme: req.body.programme,
        time: req.body.time
        
    });
    await progamme.save();
    
    res.send(progamme);
  });

  //edit
  router.put('/:id', async (req, res) => {

    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const invite = await Invite.findById(req.body.invitation); 
    if (!invite) return res.status(400).send('invalid  invite');

    const guest = await Guest.findById(req.body.guest); 
    if (!guest) return res.status(400).send('invalid  guest');
  
    const programme = await Programme.findByIdAndUpdate(req.params.id,
      { 
        invitation: req.body.invitation,
      guest: req.body.guest,
        programme: req.body.programme,
        time: req.body.time
      }, 
      { new: true });
  
    if (!programme) return res.status(404).send('The programme you request is not found.');
    
    res.send(programme);
  });




  //delete
  router.delete('/:id', async (req, res) => {
    const progamme = await Programme.findByIdAndRemove(req.params.id);
  
    if (!progamme) return res.status(404).send('This programme was not found.');
  
    res.send("programme deleted");
  });

  module.exports = router; 