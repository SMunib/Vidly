const {Rental,validate} =  require('../models/rentals');
const {Movie} = require('../models/movies');
const {Customer} = require('../models/customer');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

router
    .route('/')
    .get(async(req,res) => {
        const rentals = await Rental.find().sort('-dateOut');
        res.send(rentals);
    })
    .post(auth,async(req,res) => {
        const error = await validate(req.body);
        if (error) return res.status(400).send(error);

        const customer = await Customer.findById(req.body.customerId);
        if (!customer) return res.status(400).send('Invalid Customer');

        const movie = await Movie.findById(req.body.movieId);
        if (!movie) return res.status(400).send('Invalid Movie');

        if (movie.numberinStock === 0) return res.status(400).send('Movie not in Stock');

        const session = await Rental.startSession();
        if(!session) return res.status(500).send('Internal Server Error: Unable to start Database');
        session.startTransaction();
        try{
        let rental = new Rental({
            customer: {
                _id: customer._id,
                name: customer.name,
                phone: customer.phone,
                isGold: customer.isGold
            },
            movie: {
                _id: movie._id,
                title: movie.title,
                dailyRentalrate: movie.dailyRentalrate
            }
        });
        rental = await rental.save({session});

        movie.numberinStock--;
        await movie.save({session});
        await session.commitTransaction();   
        res.status(200).send(rental);
    }catch(ex){
        await session.abortTransaction();
        res.status(500).send(ex.message);
    }finally{
        session.endSession();
    }
    });

module.exports = router;