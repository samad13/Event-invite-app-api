const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const express = require('express');
const mongoose = require('mongoose');
const event = require('./routes/events');
const programme = require('./routes/progammes');
const contact = require('./routes/contacts');
const guest = require('./routes/guests');
const invite = require('./routes/invites');

const app = express();

mongoose.connect('mongodb://localhost/E-planner')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...'));

app.use(express.json());
app.use('/api/events',event);
app.use('/api/programmes',programme);
app.use('/api/contacts', contact);
app.use('/api/guests', guest);
app.use('/api/invites', invite);



const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening on port ${port}...`));