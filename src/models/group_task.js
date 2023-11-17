import mongoose from "mongoose";

const grpup_task_schema = new mongoose.Schema(
  {
    created_by: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    details: { type: String },
    status: {
      type: String,
      enum: ["created", "in-progress", "completed"],
      default: "created",
    },
    team_id: { type: mongoose.Schema.Types.ObjectId, required: true },
    members: { type: [{ type: mongoose.Schema.Types.ObjectId }] },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
  },
  { timestamps: true }
);

const Group_Task = mongoose.model("group_task", grpup_task_schema);

export default Group_Task;
