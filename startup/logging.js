const winston = require('winston');
// const dbUri = 'mongodb://localhost/vidly?replicaSet=rs0';
require('express-async-errors');
require('winston-mongodb');

module.exports = function() {
    winston.configure({
        exceptionHandlers: [
            new winston.transports.File({ filename: 'exceptionsandrejections.log' })
        ],
        transports: [
            new winston.transports.File({ filename: 'logfile.log' }),
            // new winston.transports.MongoDB({ db: dbUri, level: 'error' }),
            new winston.transports.Console({colorize: true, prettyPrint: true})
        ]
    }); 
}