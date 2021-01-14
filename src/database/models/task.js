const mongoose = require("mongoose");

const task = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    //   user: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "users",
    //     required: true,
    //   },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("tasks", task);
