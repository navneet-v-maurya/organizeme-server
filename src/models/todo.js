import mongoose from "mongoose";

const schema = new mongoose.Schema({
  user_id: { type: String, required: true },
  todo: { type: String, required: true },
  details: { type: String },
  start: { type: Date, default: null },
  end: { type: Date, default: null },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const todo = mongoose.model("todo", schema);

export default todo;
