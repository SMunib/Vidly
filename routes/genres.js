const express = require('express');
const router = express.Router();
const {Genre,validate} = require('../models/genres');

router
    .route('/')
    .get(async(req,res)=>{
        const genres = await Genre.find().sort('name');
        res.send(genres);
    })
    .post(async(req,res)=>{
      const {error} = validate(req.body);
      if(error) return res.status(400).send(error.details[0].message);
      
      let genre = new Genre({
        name: req.body.name
      })
      genre = await genre.save();
      res.send(genre);
    });

router
    .route('/:id')
    .patch( async(req,res)=>{
        const{error} = validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        const genre =  await Genre.findByIdAndUpdate(req.params.id,{name:req.body.name},{new: true});
        if(!genre) return res.status(404).send('The genre with the given id does not exist.....');

        res.send(genre);
    })
    .delete(async(req,res)=>{
        const genre = await Genre.findByIdAndDelete(req.params.id);
        if(!genre) return res.status(404).send('The genre with the given id does not exist......');
        res.send(genre);
    })
    .get(async(req,res)=>{
        const genre = await Genre.findById(req.params.id);
        if(!genre) return res.status(404).send('The genre with the give id does not exist......');
        res.send(genre);
    });

module.exports = router