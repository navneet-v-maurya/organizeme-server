import mongoose from "mongoose";

const schema = new mongoose.Schema(
  {
    user_id: { type: String, required: true },
    todo: { type: String, required: true },
    details: { type: String },
    is_active: { type: Boolean, default: false },
    is_done: { type: Boolean, default: false },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
  },
  { strict: true }
);

const todo = mongoose.model("todo", schema);

export default todo;
