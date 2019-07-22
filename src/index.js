// ./src/index.js

// load environment variables
require('dotenv').config();

//importing the dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const {startDatabase} = require('./database/mongo');
const vacationsAPI = require('./vacationsAPI');

// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

// enabling CORS for all requests (not very secure)
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

app.use('/vacations', vacationsAPI);

// start the in-memory MongoDB instance
startDatabase().then(async () => {
  // start the server
  app.listen(3001, async () => {
    console.log('listening on port 3001');
  });
});
