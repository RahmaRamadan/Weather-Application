// THIS IS THE SERVER SIDE FILE

/* Empty JS object to act as endpoint for all routes */
projectData = {};

// Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();
app.use(express.json());

/* Dependencies */
// parse url application form
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

// Cors for cross origin allowance, connect client and server side
const cors = require("cors");
const { response } = require("express");
app.use(cors());

/* Initializing the main project folder */
app.use(express.static("website"));

// lisener function to check server
function listening() {
  console.log("server running");
}
//-------------------------------------------------------------------------

// GET Route
app.get("/all", getAllProjects);
// Callback function to complete GET '/all'
const getAllProjects = (req, res) => {
  return res.status(200).send(projectData);
};

//-------------------------------------------------------------------------

// GET Route
app.post("/add", postData);
// Callback function to complete POST '/add'
const postData = (req, res) => {
  projectData = req.body;
  console.log(projectData);
  res.status(200).send(projectData);
};

//-------------------------------------------------------------------------


// spin up the server
app.listen(3000, listening);
