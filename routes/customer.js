const express = require('express');
const router = express.Router();
const {Customer,validate} = require('../models/customer');
const auth = require('../middleware/auth');

router
    .route('/')
    .get(async(req,res) => {
        const customer = await Customer.find().sort('name');
        res.send(customer);
    })
    .post(auth,async(req,res) => {
        const {error} = validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);

        let customer = new Customer({
            name: req.body.name,
            phone: req.body.phone,
            isGold: req.body.isGold
        })
        customer = await customer.save();
        res.send(customer);
    });

router
    .route('/:id')
    .patch(auth,async(req,res) => {
        const error = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const customer = await Customer.findByIdAndUpdate(req.params.id,
        {
            name:req.body.name,
            isGold:req.body.isGold,
            phone:req.body.phone
        },
        {new: true});
        if(!customer) return res.status(404).send('Customer with the given id does not exist.....');

        res.send(customer);
    })
    .delete(auth,async(req,res) => {
        const error = validate(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const customer = await Customer.findByIdAndDelete(req.params.id);
        if(!customer) return res.status(404).send('Customer with the given id does not exist.....');

        res.send(customer);
    })
    .get(async(req,res) => {
        const customer = await Customer.findById(req.params.id);
        if(!customer) return res.status(404).send('Customer with the given id does not exist.....');
        res.send(customer);
    });

module.exports = router