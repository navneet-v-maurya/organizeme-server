import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    created_by: { type: mongoose.Schema.Types.ObjectId, required: true },
    created_for: [{ type: mongoose.Schema.Types.ObjectId }],
    todo: { type: String, required: true },
    details: { type: String },
    status: {
      type: String,
      enum: ["created", "in-progress", "completed"],
    },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
  },
  { timestamps: true }
);

const Todo = mongoose.model("todo", schema);

export default Todo;
