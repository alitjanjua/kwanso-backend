const mongoose = require("mongoose");

const task = mongoose.Schema({
  task_name: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

module.exports = mongoose.model("tasks", task);
