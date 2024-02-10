const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Movie,validate} = require('../models/movies');
const { Genre } = require('../models/genres');
const auth = require('../middleware/auth');

router
    .route('/')
    .get(async(req,res) => {
        const movies = await Movie.find().sort('title');
        res.send(movies);
    })
    .post(auth,async(req,res) => {
        const {error} = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const genre = await Genre.findById(req.body.genreId);
        if(!genre) return res.status(400).send('Invalid Genre');

        let movie = new Movie({
            title: req.body.title,
            numberinStock: req.body.numberinStock,
            dailyRentalrate: req.body.dailyRentalrate,
            genre:genre
        });
        movie = await movie.save();
        res.send(movie);
    });

router
    .route('/:id')
    .get(async(req,res) => {
        const movie = await Movie.findById(req.params.id);
        if(!movie) return res.status(404).send('Movie not found....');
        res.send(movie);
    })
    .patch(auth,async(req,res) => {
        const {error} = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const movie = await Movie.findByIdAndUpdate(req.params.id,{
            title: req.body.title,
            numberinStock: req.body.numberinStock,
            dailyRentalRate: req.body.dailyRentalRate
        },{new:true});
        if(!movie) return res.status(404).send('Movie not found....');
        res.send(movie);
    })
    .delete(auth,async(req,res) => {
        const movie = await Movie.findByIdAndDelete(req.params.id);
        if(!movie) return res.status(404).send('Movie not found....');
        res.send(movie);
    })

module.exports = router