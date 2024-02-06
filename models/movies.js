const Joi = require('joi');
const mongoose = require('mongoose');
const {genreSchema} = require('./genres');

const movieSchema = new mongoose.Schema({
    title :{
        type: String,
        required: true,
        trim: true,
        maxlength: 255
    },
    numberinStock: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    dailyRentalrate: {
        type: Number,
        required: true,
        min: 0,
        max: 255
    },
    genre: {
        type: genreSchema,
        required: true
    }
})
const Movie = mongoose.model('Movie',movieSchema);

async function validateMovie(movie) {
    const schema = Joi.object({
        title: Joi.string().max(255).required(),
        dailyRentalrate: Joi.number().min(0).max(255).required(),
        numberinStock: Joi.number().min(0).max(255).required(),
        genreId: Joi.objectId().required()
    });
    try{
        await schema.validateAsync(movie);
        // console.log("Validation Passed(Joi)");
    }catch(error){
        console.log(error);
    }   
}

exports.Movie = Movie;
exports.validate = validateMovie;