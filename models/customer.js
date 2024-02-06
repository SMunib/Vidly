const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 10
    },
    isGold: {
        type: Boolean,
        default: false,
    }
});
const Customer = mongoose.model('Customer',customerSchema);

async function validateCustomer(customer){
    const schema = Joi.object({
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(10).max(10).required(),
        isGold: Joi.boolean()
    });
    try{
        await schema.validateAsync(customer);
        // console.log("validation passed");
    }catch(er){
        console.log(er);
        throw er;
    }
}

exports.Customer = Customer;
exports.validate = validateCustomer;