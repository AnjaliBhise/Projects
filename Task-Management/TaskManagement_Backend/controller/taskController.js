// Import the Task model from taskModel.js
const Task = require("../model/taskModel.js");

// For posting data into the database
const create = async (req, res) => {
    try {
        // Create a new Task instance with the request body
        const taskData = new Task(req.body);
        // Save the new task data into the database
        const savedTask = await taskData.save();
        // Send a success response with the saved task data
        res.status(200).json(savedTask);
    } catch (error) {
        // Handle any errors and send an internal server error response
        res.status(500).json({ error: "Internal Server Error." });
    }
};

// For getting all tasks from the database
const fetch = async (req, res) => {
    try {
        // Find all tasks in the database
        const tasks = await Task.find();
        // If no tasks are found, send a 404 error response
        if (tasks.length === 0) {
            return res.status(404).json({ message: "Tasks not found." });
        }
        // Send a success response with the fetched tasks data
        res.status(200).json(tasks);
    } catch (error) {
        // Handle any errors and send an internal server error response
        res.status(500).json({ error: "Internal Server Error." });
    }
};

// For getting a specific task by ID
const task = async (req, res) => {
    try {
        // Extract the task ID from the request parameters
        const id = req.params.id;
        // Find a task with the given ID
        const taskExist = await Task.findOne({ _id: id }); 
        // If the task is not found, send a 404 error response
        if (!taskExist) {
            return res.status(404).json({ message: "Task not found." });
        }
        // Send a success response with the found task data
        res.status(201).json(taskExist);
    } catch (error) {
        // Handle any errors and send an internal server error response
        res.status(500).json({ error: "Internal Server Error." });
    }
};

// For updating a specific task by ID
const update = async (req, res) => {
    try {
        // Extract the task ID from the request parameters
        const id = req.params.id;
        // Find a task with the given ID
        const taskExist = await Task.findOne({ _id: id }); 
        // If the task is not found, send a 404 error response
        if (!taskExist) {
            return res.status(404).json({ message: "Task not found." });
        }
        // Update the task with the given ID using the request body
        const updateTask = await Task.findByIdAndUpdate(id, req.body, { new: true });
        // Send a success response with the updated task data
        res.status(201).json(updateTask);
    } catch (error) {
        // Handle any errors and send an internal server error response
        res.status(500).json({ error: "Internal Server Error." });
    }
};

// For deleting a specific task by ID
const deleteTask = async (req, res) => {
    try {
        // Extract the task ID from the request parameters
        const id = req.params.id;
        // Find a task with the given ID
        const taskExist = await Task.findOne({ _id: id }); 
        // If the task is not found, send a 404 error response
        if (!taskExist) {
            return res.status(404).json({ message: "Task not found." });
        }
        // Delete the task with the given ID
        await Task.findByIdAndDelete(id);
        // Send a success response indicating the task was deleted
        res.status(201).json({ message: "Task deleted successfully." });
    } catch (error) {
        // Handle any errors and send an internal server error response
        res.status(500).json({ error: "Internal Server Error." });
    }
}

// Export the functions for use in other modules
module.exports = {
    create,
    fetch,
    update,
    deleteTask,
    task
};
