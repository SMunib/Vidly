const express = require('express');
const router = express.Router();
const {User} = require('../models/users');
const bcrypt = require('bcrypt');
const Joi = require('joi');

router
    .route('/')
    .post(async(req,res)=>{
        const {error} = await validate(req.body);
        if (error) return res.status(400).send(error);
        
        let user = await User.findOne({email: req.body.email})
        if (!user) return res.status(400).send('Invalid Email or Password');

        const validPass = await bcrypt.compare(req.body.password,user.password);
        if(!validPass) return res.status(400).send('Invalid Email or Password');
        //never hardcode the private key in a real world application
        const token = user.generateAuthToken();
        res.send(token);
    });

    //logging out user not shown by mosh

    async function validate(user) {
        const schema = Joi.object({
            email: Joi.string().min(5).max(255).required().email(),
            password: Joi.string().min(5).max(255).required()
        });
        try{
            await schema.validateAsync(user);
            console.log("Validation Passed(Joi)");
            return{};
        }catch(err){
            return {error: err.message};
        }   
    }
    
module.exports = router