const {Guest, validate} = require('../models/guest');
const {Invite } = require('../models/invite');
const {Contact } = require('../models/contact');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const guestList = await Guest.find()
    if(!guestList) {
        res.status(500).send("Guest list is empty")
    }
    res.send(guestList);
  });


  //get by id
  router.get('/:id', async (req, res) => {
    const guest = await Guest.findById(req.params.id).populate(["invitation", "contact"]);
  
    if (!guest ) return res.status(404).send('The guest ID was not found.');
  
    res.send(guest );
  });

  // create
  router.post('/', async (req, res) => {
     const { error } = validate(req.body); 
     if (error) return res.status(400).send(error.details[0].message);


     const invite = await Invite.findById(req.body.invitation); 
    if (!invite) return res.status(400).send('invalid  invite');

    const contact = await Contact.findById(req.body.contact); 
    if (!contact) return res.status(400).send('invalid  contact');
  
    const guest = new Guest({ 
      invitation:req.body.invitation,
      contact: req.body.contact,
      title: req.body.title,
       firstName: req.body.firstname,
        surName: req.body.surname,
        seatNumber: req.body.seatnumber,
        picture:req.body.picture
    });
    await guest.save();
    
    res.send(guest);
  });

  //edit
  router.put('/:id', async (req, res) => {

    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    const invite = await Invite.findById(req.body.invitation); 
    if (!invite) return res.status(400).send('invalid  invite');

    const contact = await Contact.findById(req.body.contact); 
    if (!contact) return res.status(400).send('invalid  contact');
  
    const guest = await Guest.findByIdAndUpdate(req.params.id,
      { 
        invitation:req.body.invitation,
      contact: req.body.contact,
      title: req.body.title,
       firstName: req.body.firstname,
        surName: req.body.surname,
        seatNumber: req.body.seatnumber,
        picture:req.body.picture
      }, 
      { new: true });
  
    if (!guest) return res.status(404).send('The guest you request is not found.');
    
    res.send(guest);
  });



  //delete
  router.delete('/:id', async (req, res) => {
    const guest = await Guest.findByIdAndRemove(req.params.id);
  
    if (!guest) return res.status(404).send('This guest was not found.');
  
    res.send("guest deleted");
  });

module.exports = router;