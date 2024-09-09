// Import the express module
const express = require("express");

// Import controller functions for handling task routes
const { create, fetch, update, deleteTask, task } = require("../controller/taskController.js");

// Create a new router instance for defining routes
const route = express.Router();

// Define routes and their corresponding controller functions

// Route to get a specific task by ID
// Handles GET requests to '/task/:id'
route.get("/task/:id", task);

// Route to fetch all tasks
// Handles GET requests to '/tasks'
route.get("/tasks", fetch); 

// Route to create a new task
// Handles POST requests to '/task'
route.post("/task", create); 

// Route to update an existing task by ID
// Handles PUT requests to '/update/:id'
route.put("/update/:id", update); 

// Route to delete a task by ID
// Handles DELETE requests to '/delete/:id'
route.delete("/delete/:id", deleteTask); 

// Export the router to be used in other parts of the application
module.exports = route;
