const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = 2400;

app.use(cors());
app.use(bodyParser.json());

const uri = "mongodb://localhost:27017/myDatabase";

mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

const todoSchema = new mongoose.Schema({
  title: String,
  desc: String,
  date: { type: Date, default: Date.now },
});


const Todo = mongoose.model("Todo", todoSchema);

app.post("/todos", async (req, res) => {
  const { title, desc } = req.body;
  const todo = new Todo({ title, desc });
  await todo.save();
  res.status(201).json(todo);
});


app.get("/todos", async (req, res) => {
  //const todos = await Todo.find();
  //res.send(todos);
  const page = parseInt(req.query.page) || 1;
  const limit =10;

  try {
    const totalTodos = await Todo.countDocuments();
    const totalPages = Math.ceil(totalTodos / limit);

    const todos = await Todo.find().skip((page - 1) * limit).limit(limit);

    res.json({
      todos,
      page,
      totalPages,
      totalTodos,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.put("/todos/:id", async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(todo);
});

app.delete("/todos/:id", async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.status(204).send();
});

app.get("/todos/:id", async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (!todo) return res.status(404).json({ message: "Todo not found" });
  res.json(todo);
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});