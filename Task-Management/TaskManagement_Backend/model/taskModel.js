const mongoose = require("mongoose");

// Define the schema for the task entity
const taskSchema = new mongoose.Schema({
  assignedTo: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  dueDate: {
    type: Date,
  },
  priority: {
    type: String,
    required: true,
  },
  comments: {
    type: String,
  },
});

// Create and export the Mongoose model for the "Tasks" collection based on the taskSchema
module.exports = mongoose.model("Tasks", taskSchema);
