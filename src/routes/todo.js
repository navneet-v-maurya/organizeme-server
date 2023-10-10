import express from "express";
import { add_todo } from "../controllers/todo.js";

const route = express.Router();

route.post("/add_todo", (req, res) => {
  const data = req.body;
  add_todo(data, (err, result) => {
    if (err) {
      return res.status(err.status).send(err);
    } else {
      return res.status(result.status).send(result);
    }
  });
});

export default route;
