const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const config = require('config');

const genres = require('./routes/genres');
const customers = require('./routes/customer');
const rentals = require('./routes/rentals');
const movies = require('./routes/movies');
const users = require('./routes/users');
const auth = require('./routes/auth');
const app = express();

if(!config.get('jwtPrivateKey')){
    console.log('FATAL ERROR: jwtprivatekey not defined');
    process.exit(1);
}

const dbUri = 'mongodb://localhost/vidly?replicaSet=rs0';
mongoose.connect(dbUri)
    .then(()=> console.log('Connected to MongoDb......'))
    .catch(err => console.error('Could not Connect to MongoDb.....'));

app.use(express.json());
app.use('/api/genres',genres);
app.use('/api/customer',customers);
app.use('/api/movies',movies);
app.use('/api/rentals',rentals);
app.use('/api/users',users);
app.use('/api/auth',auth);

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`listening on port ${port}.....`));