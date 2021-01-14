const TaskModel = require("../database/models/task");

module.exports = {
  createTask: async (req, res) => {
    const { name } = req.body;
    const { user } = res.locals;
    const newTask = await TaskModel.create({
      task_name: name,
      //   user: user._id,    // commenting for fe use
    });
    if (newTask)
      res
        .status(201)
        .json({ task: { id: newTask._id, name: newTask.task_name } });
    else res.status(500).send("Unexpected error");
  },

  getUserTasks: async (req, res) => {
    const { user } = res.locals;
    try {
      //   const taskRecords = await TaskModel.find({ user: user._id });    // commenting for fe use
      const taskRecords = await TaskModel.find({});
      if (!taskRecords) {
        throw new Error("Error in getting tasksfrom db! :(");
      }

      return res.status(200).json({
        tasks: taskRecords,
      });
    } catch (e) {
      res.status(500).json(e.message);
    }
  },
};
