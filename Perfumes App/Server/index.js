const express = require("express"); 
const mongoose = require("mongoose"); 
const bodyParser = require("body-parser"); 
const dotenv = require("dotenv"); 
const route = require("./routes/perfumeRoute.js");
const cors = require("cors");

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
    console.log("Database connected successfully."); 
    
    app.listen(PORT, () => {
      console.log(`Server is running on port : ${PORT}`); 
    });
  })
  .catch((error) => console.log(error)); 

  app.use("/api", route);