const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
});
const Genre =  mongoose.model('Genre',genreSchema);

async function validateGenre(genre) {
    const schema = Joi.object({
        name: Joi.string().min(5).required()
    });
    try{
        await schema.validateAsync(genre);
        // console.log("Validation Passed(Joi)");
    }catch(error){
        console.log(error);
    }   
}

exports.genreSchema = genreSchema;
exports.Genre = Genre;
exports.validate = validateGenre;