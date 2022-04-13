// THIS IS THE SERVER SIDE FILE

/* Empty JS object to act as endpoint for all routes */
projectData = {};

// Express to run server and routes
const express = require('express');

// Start up an instance of app
const app = express();
app.use(express.json())

/* Dependencies */
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance, connect client and server side
const cors = require('cors');
const { response } = require('express');
app.use(cors());

/* Initializing the main project folder */
app.use(express.static('website'));

// lisener function
function listening(){
    console.log("server running"); 
}

// server listen "backend part"
const server = app.listen(3000, listening)