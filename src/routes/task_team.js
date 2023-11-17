import express from "express";
import authenticator from "../../utils/authenticator.js";
import { add_task_team } from "../controllers/task_team.js";

const route = express.Router();

route.post("/add_task_team", authenticator, (req, res) => {
  const data = req.body;
  data.user = req.user;
  add_task_team(data, (err, result) => {
    if (err) {
      return res.status(err.status).send(err);
    } else {
      return res.status(result.status).send(result);
    }
  });
});

export default route;
