import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    created_by: { type: mongoose.Schema.Types.ObjectId, required: true },
    title: { type: String, required: true },
    details: { type: String },
    status: {
      type: String,
      enum: ["created", "in-progress", "completed"],
      default: "created",
    },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
  },
  { timestamps: true }
);

const My_Task = mongoose.model("my_task", schema);

export default My_Task;
