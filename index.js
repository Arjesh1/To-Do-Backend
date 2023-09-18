const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const ToDoModel = require("./modals/ToDo");
const UserModel = require("./modals/User")
const bcrypt = require("bcrypt")

const PORT = 3001;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost/toDoList");



app.post("/add", async (req, res) => {
  try {
    const taskInfo = new ToDoModel(req.body);
    await taskInfo.save();
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

app.put("/update", async (req, res) => {
  try {
    const { _id, ...rest } = req.body;
    await ToDoModel.findByIdAndUpdate(_id, rest, { new: true });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await ToDoModel.findByIdAndDelete({ _id: id });
    res.json("Success");
  } catch (error) {
    console.log(error);
  }
});

//register

app.post("/register", async (req, res) => {

  console.log(req.body);
  try {
    const newUser = new UserModel(req.body);
    newUser.hashPassword = bcrypt.hashSync(req.body.password, 10);
    const savedUser = await newUser.save();
    savedUser.hashPassword = undefined;
    return res.json(savedUser);
  } catch (err) {
    console.log(err);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
