const mongoose = require("mongoose");

const ToDoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  },

  dueDate: {
    type: Number,
    required: true,
  },
});

const ToDoModel = mongoose.model("tasks", ToDoSchema);
module.exports = ToDoModel;
