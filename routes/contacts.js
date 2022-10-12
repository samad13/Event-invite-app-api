const {Contact, validate} = require('../models/contact'); 
const {Event } = require('../models/event');
//const {Invite } = require('../models/invite');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


// get all
router.get('/', async (req, res) => {
    const contacts = await Contact.find();
    res.send(contacts);
  });


  //get by id
  router.get('/:id', async (req, res) => {
    const contact = await Contact.findById(req.params.id).populate("event");
  
    if (!contact ) return res.status(404).send('The contact with the given ID was not found.');
  
    res.send(contact );
  });

  // to post
  router.post('/', async (req, res) => {
     const { error } = validate(req.body); 
     if (error) return res.status(400).send(error.details[0].message);

     const event = await Event.findById(req.body.event); 
    if (!event) return res.status(400).send('invalid  event');
  
    const contact = new Contact({
      event: req.body.event, 
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
        
    });
    await contact.save();
    
    res.send(contact);
  });

  //to edit
  router.put('/:id', async (req, res) => {

    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const event = await Event.findById(req.body.event); 
    if (!event) return res.status(400).send('invalid  event');
  
  
    const contact = await Con.findByIdAndUpdate(req.params.id,
      { 
        event: req.body.event, 
        name: req.body.name,
        phone: req.body.phone,
        email: req.body.email
        
        
      }, 
      { new: true });
  
    if (!contact) return res.status(404).send('The contact you request is not found.');
    
    res.send(contact);
  });



  //delete
  router.delete('/:id', async (req, res) => {
    const contact = await Contact.findByIdAndRemove(req.params.id);
  
    if (!contact) return res.status(404).send('This contact was not found.');
  
    res.send("contact deleted");
  });


module.exports = router;