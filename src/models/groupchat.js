import mongoose from "mongoose";

const groupSchema = mongoose.Schema(
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

const Group = mongoose.model("group_chat", groupSchema);
export default Group;
