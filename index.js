const express = require('express');
const app = express();
const winston = require('winston');
// const logger = require('./startup/logging');

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();

const port = process.env.PORT || 3000;    
const server = app.listen(port, () => winston.info(`listening on port ${port}.....`));

module.exports = server;