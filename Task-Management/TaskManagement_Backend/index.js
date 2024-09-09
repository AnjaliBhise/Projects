const express = require("express"); // Import Express framework
const mongoose = require("mongoose"); // Import Mongoose for MongoDB interactions
const bodyParser = require("body-parser"); // Import Body-parser for parsing request bodies
const dotenv = require("dotenv"); // Import dotenv for loading environment variables
const route = require("./routes/taskRoutes.js");
const cors = require("cors");
//Line to to added 
//import route from "./routes/taskRoutes.js";

// Initialize Express app
const app = express();

app.use(cors());
// Middleware for parsing JSON request bodies
app.use(bodyParser.json());

// Load environment variables from .env file
dotenv.config();

// Define port for the server to listen on
const PORT = process.env.PORT || 5000;

// Define MongoDB connection URL from environment variables
const MONGOURL = process.env.MONGO_URL;

// Connect to MongoDB database
mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("Database connected successfully."); // Log successful database connection
    // Start server on specified port
    app.listen(PORT, () => {
      console.log(`Server is running on port : ${PORT}`); // Log server running message
    });
  })
  .catch((error) => console.log(error)); // Log error if database connection fails

  app.use("/api", route);