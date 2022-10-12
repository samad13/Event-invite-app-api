const {Invite, validate} = require('../models/invite'); 
const {Event } = require('../models/event');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// get all
router.get('/', async (req, res) => {
  const savedInvites = await Invite.find().populate("event");;
  if (!savedInvites ) return res.status(404).send('No invitation yet.');
    
    res.send(savedInvites)
  });


  //get by id
  router.get('/:id', async (req, res) => {
    const invites = await Invite.findById(req.params.id).populate("event");
  
    if (!invites ) return res.status(404).send('The invitation with the given ID was not found.');
  
    res.send(invites );
  });
  

//post request
  router.post('/', async (req, res) => {

     const { error } = validate(req.body); 
     if (error) return res.status(400).send(error.details[0].message);

     const event = await Event.findById(req.body.event); 
    if (!event) return res.status(400).send('invalid  event');
  
    const invite = new Invite({ 
      event:req.body.event,
        invitation: req.body.invitation,
        venue: req.body.venue,
        address: req.body.address,
        date: req.body.date,
        time:req.body.time
    });
    await invite.save();
    
    res.send(invite);
  });

  //edit
  router.put('/:id', async (req, res) => {

    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const event = await Event.findById(req.body.event); 
    if (!event) return res.status(400).send('invalid  event');
  
  
    const invite = await Invite.findByIdAndUpdate(req.params.id,
      { 
        event:req.body.event,
        invitation: req.body.invitation,
        venue: req.body.venue,
        address: req.body.address,
        date: req.body.date,
        time:req.body.time
      }, 
      { new: true });
  
    if (!invite) return res.status(404).send('The invitation you request is not found.');
    
    res.send(invite);
  });
  






  //delete
  router.delete('/:id', async (req, res) => {
    const invitation = await Invite.findByIdAndRemove(req.params.id);
  
    if (!invitation) return res.status(404).send('This invitation was not found.');
  
    res.send("invitation deleted");
  });



module.exports = router;