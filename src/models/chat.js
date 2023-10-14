import mongoose from "mongoose";

const chatSchema = mongoose.Schema(
  {
    members: {
      type: Array,
      required: true,
    },
  },
  { timestamps: true }
);

const Chat = mongoose.model("chat", chatSchema);
export default Chat;
