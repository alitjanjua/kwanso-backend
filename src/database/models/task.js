const mongoose = require("mongoose");

const task = mongoose.Schema({});

module.exports = mongoose.model("tasks", task);
