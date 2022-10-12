const {Programme, validate } = require('../models/progamme'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();


router.get('/', async (req, res) => {
    const progamme = await Programme.find();
    res.send(progamme);
  });

  router.post('/', async (req, res) => {
     const { error } = validate(req.body); 
     if (error) return res.status(400).send(error.details[0].message);
  
    let progamme = new Programme({ 
        programme: req.body.programme,
        time: req.body.time
        
    });
    progamme = await progamme.save();
    
    res.send(progamme);
  });



  module.exports = router; 