import User from "../models/user.js";
import Otp from "../models/otp.js";

import responseStructure from "../../utils/responseStructure.js";

import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../utils/webTokens.js";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASS,
  },
});

export const generate_otp = async (data, cb) => {
  try {
    if (!data.email) throw new Error("params missing");

    const otp = Math.floor(Math.random() * 1000000);

    const newOTP = new Otp({
      email: data.email,
      otp: otp,
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: data.email,
      subject: "OTP Verification",
      text: `Your 6 Digit OTP for email Verification is ${otp}`,
    };

    await Promise.all([transporter.sendMail(mailOptions), newOTP.save()]);

    return cb(
      null,
      responseStructure
        .merge({
          status: 200,
          success: true,
          data: null,
          message: "ok",
        })
        .toJS()
    );
  } catch (err) {
    return cb(
      responseStructure
        .merge({
          status: 400,
          success: false,
          data: null,
          message: err.message,
        })
        .toJS()
    );
  }
};

export const register_user = async (data, cb) => {
  try {
    if (!data.email || !data.password || !data.name || !data.otp) {
      throw new Error("params missing");
    }

    const [found_user, found_otp] = await Promise.all([
      User.findOne({ email: data.email }),
      Otp.findOne({ email: data.email }),
    ]);

    if (found_user) throw new Error("this email already exists");
    if (!found_otp) throw new Error("no otp found");

    if (data.otp !== found_otp.otp) throw new Error("Please enter a valid otp");

    const salt = await bcrypt.genSalt(10);

    const hashed_pass = await bcrypt.hash(data.password, salt);

    const new_user = new User({
      name: data.name,
      password: hashed_pass,
      email: data.email,
    });

    const [result, deleted_otp] = await Promise.all([
      new_user.save(),
      Otp.findByIdAndDelete({ _id: found_otp._id }),
    ]);

    const accessToken = generateAccessToken(result);
    const refreshToken = generateRefreshToken(result);

    const { password, ...rest } = result._doc;

    return cb(
      null,
      responseStructure
        .merge({
          status: 200,
          success: true,
          data: { ...rest, refreshToken, accessToken },
          message: "ok",
        })
        .toJS()
    );
  } catch (err) {
    return cb(
      responseStructure
        .merge({
          status: 400,
          success: false,
          data: null,
          message: err.message,
        })
        .toJS()
    );
  }
};

export const login_user = async (data, cb) => {
  try {
    if (!data.email || !data.password) throw new Error("params missing");

    const found_user = await User.findOne({ email: data.email });
    if (!found_user) throw new Error("no user found");

    const pass_matched = await bcrypt.compare(
      data.password,
      found_user.password
    );

    if (!pass_matched) throw new Error("Wrong password");

    const accessToken = generateAccessToken(found_user);

    const refreshToken = generateRefreshToken(found_user);

    const { password, ...rest } = found_user._doc;

    return cb(
      null,
      responseStructure
        .merge({
          status: 200,
          success: true,
          data: { ...rest, refreshToken, accessToken },
          message: "ok",
        })
        .toJS()
    );
  } catch (err) {
    return cb(
      responseStructure
        .merge({
          status: 400,
          success: false,
          data: null,
          message: err.message,
        })
        .toJS()
    );
  }
};
