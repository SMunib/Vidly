const express = require('express');
const router = express.Router();
const {Genre,validate} = require('../models/genres');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const validateobjectid =  require('../middleware/validateobjectid');

router
    .route('/')
    .get(async(req,res)=>{
        // throw new Error('Could not get genres')
        const genres = await Genre.find().sort('name');
        res.send(genres);
    })
    .post(auth,async(req,res)=>{  
      const error = await validate(req.body);
      if(error) return res.status(400).send(error);
      
      let genre = new Genre({
        name: req.body.name
      })
      genre = await genre.save();
      res.send(genre);
    });

router
    .route('/:id')
    .patch(auth, async(req,res)=>{
        const{error} = validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const genre =  await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},{new: true});
        if(!genre) return res.status(404).send('The genre with the given id does not exist.....');

        res.send(genre);
    })
    .delete([auth,admin],async(req,res)=>{
        const genre = await Genre.findByIdAndDelete(req.params.id);
        if(!genre) return res.status(404).send('The genre with the given id does not exist......');
        res.send(genre);
    })
    .get(validateobjectid,async(req,res)=>{
        const genre = await Genre.findById(req.params.id);
        if(!genre) return res.status(404).send('The genre with the give id does not exist......');
        res.send(genre);
    });

module.exports = router