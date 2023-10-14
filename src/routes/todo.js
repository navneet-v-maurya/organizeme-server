import express from "express";
import authenticator from "../../utils/authenticator.js";
import {
  add_todo,
  delete_todo,
  get_todo,
  update_todo,
  update_todo_status,
} from "../controllers/todo.js";

const route = express.Router();

route.post("/add_todo", authenticator, (req, res) => {
  const data = req.body;
  add_todo(data, (err, result) => {
    if (err) {
      return res.status(err.status).send(err);
    } else {
      return res.status(result.status).send(result);
    }
  });
});

route.get("/get_todo", authenticator, (req, res) => {
  const data = req.query;
  get_todo(data, (err, result) => {
    if (err) {
      return res.status(err.status).send(err);
    } else {
      return res.status(result.status).send(result);
    }
  });
});

route.delete("/delete_todo", authenticator, (req, res) => {
  const data = req.query;
  delete_todo(data, (err, result) => {
    if (err) {
      return res.status(err.status).send(err);
    } else {
      return res.status(result.status).send(result);
    }
  });
});

route.patch("/update_todo", authenticator, (req, res) => {
  const data = req.body;
  update_todo(data, (err, result) => {
    if (err) {
      return res.status(err.status).send(err);
    } else {
      return res.status(result.status).send(result);
    }
  });
});

route.patch("/update_todo_status", authenticator, (req, res) => {
  const data = req.body;
  update_todo_status(data, (err, result) => {
    if (err) {
      return res.status(err.status).send(err);
    } else {
      return res.status(result.status).send(result);
    }
  });
});

export default route;
