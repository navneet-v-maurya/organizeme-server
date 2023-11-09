import mongoose from "mongoose";

const task_team = mongoose.Schema(
  {
    members: {
      type: Array,
      required: true,
    },
    group_name: {
      type: String,
      required: true,
    },
    created_by: { type: mongoose.Schema.Types.ObjectId, required: true },
    admins: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Task_Team = mongoose.model("task_team", task_team);
export default Task_Team;
