import express from "express";
import {
  generate_otp,
  login_user,
  register_user,
} from "../controllers/auth.js";

const route = express.Router();

route.post("/generate_otp", (req, res) => {
  const data = req.body;
  generate_otp(data, (err, result) => {
    if (err) {
      return res.status(err.status).send(err);
    } else {
      return res.status(result.status).send(result);
    }
  });
});

route.post("/register", (req, res) => {
  const data = req.body;
  register_user(data, (err, result) => {
    if (err) {
      return res.status(err.status).send(err);
    } else {
      return res.status(result.status).send(result);
    }
  });
});

route.post("/login", (req, res) => {
  const data = req.body;
  login_user(data, (err, result) => {
    if (err) {
      return res.status(err.status).send(err);
    } else {
      return res.status(result.status).send(result);
    }
  });
});

export default route;
