const {Event, validate} = require('../models/event');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {

  const eventList = await Event.find().select({eventName: 1});//and sort by date
  if (!eventList) return res.status(404).send('You have not created any event yet.');

  res.send(eventList);
});

// post request
router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);
 
  const event = new Event({ 
    eventName:req.body.eventName,
    eventType: req.body.eventType,
    eventDate: req.body.eventDate,
    eventTime: req.body.eventTime,
    guestNumber: req.body.guestNumber
  });
  await event.save();
  
  res.send(event);
});

//update
router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const event = await Event.findByIdAndUpdate(req.params.id,
    { 
    eventName:req.body.eventName,
    eventType: req.body.eventType,
    eventDate: req.body.eventDate,
    eventTime: req.body.eventTime,
    guestNumber: req.body.guestNumber
    }, 
    { new: true });

  if (!event) return res.status(404).send('The event ID was not found.');
  
  res.send(event);
});

//get by id
router.get('/:id', async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) return res.status(404).send('The event with the given ID was not found.');

  res.send(event);
});


//delete
router.delete('/:id', async (req, res) => {
  const event = await Event.findByIdAndRemove(req.params.id);

  if (!event) return res.status(404).send('The events with the given ID was not found.');

  res.send("event deleted");
});





module.exports = router; 