import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: Number, required: true },
  createdAt: { type: Date, expires: 180, default: Date.now },
});
const Otp = mongoose.model("otp", otpSchema);

export default Otp;
