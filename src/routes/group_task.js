import express from "express";
import authenticator from "../../utils/authenticator.js";
import { add_group_task } from "../controllers/group_task.js";

const route = express.Router();

route.post("/add_group_task", authenticator, (req, res) => {
  const data = req.body;
  data.user = req.user;
  add_group_task(data, (err, result) => {
    if (err) {
      return res.status(err.status).send(err);
    } else {
      return res.status(result.status).send(result);
    }
  });
});

export default route;
