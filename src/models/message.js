import mongoose from "mongoose";

const messageSchema = mongoose.Schema(
  {
    chatId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    senderId: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    attchments: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Message = mongoose.model("message", messageSchema);
export default Message;
