import express from "express";
import authenticator from "../../utils/authenticator.js";
import {
  add_my_task,
  delete_my_task,
  get_my_task,
  update_my_task,
} from "../controllers/my_task.js";

const route = express.Router();

route.post("/add_my_task", authenticator, (req, res) => {
  const data = req.body;
  data.user = req.user;
  add_my_task(data, (err, result) => {
    if (err) {
      return res.status(err.status).send(err);
    } else {
      return res.status(result.status).send(result);
    }
  });
});

route.get("/get_my_task", authenticator, (req, res) => {
  const data = req.query;
  get_my_task(data, (err, result) => {
    if (err) {
      return res.status(err.status).send(err);
    } else {
      return res.status(result.status).send(result);
    }
  });
});

route.delete("/delete_my_task", authenticator, (req, res) => {
  const data = req.query;
  delete_my_task(data, (err, result) => {
    if (err) {
      return res.status(err.status).send(err);
    } else {
      return res.status(result.status).send(result);
    }
  });
});

route.patch("/update_my_task", authenticator, (req, res) => {
  const data = req.body;
  update_my_task(data, (err, result) => {
    if (err) {
      return res.status(err.status).send(err);
    } else {
      return res.status(result.status).send(result);
    }
  });
});

export default route;
