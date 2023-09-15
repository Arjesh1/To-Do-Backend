const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const ToDoModel = require("./modals/ToDo");

const PORT = 3001;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost/toDoList");

app.post("/add", async (req, res) => {
  try {
    const taskInfo = new ToDoModel(req.body);
    const savedTask = await taskInfo.save();
    res.json(savedTask);
  } catch (error) {
    console.log(error);
  }
});

app.get("/get", (req, res) => {
  try {
    ToDoModel.find().then((result) => res.json(result));
  } catch (error) {
    console.log(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
