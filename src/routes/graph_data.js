import express from "express";
import authenticator from "../../utils/authenticator.js";
import { my_task_graph_data } from "../controllers/graph.js";

const route = express.Router();

route.get("/my_task_graph_data", authenticator, (req, res) => {
  const data = req.query;
  data.user = req.user;
  my_task_graph_data(data, (err, result) => {
    if (err) {
      return res.status(err.status).send(err);
    } else {
      return res.status(result.status).send(result);
    }
  });
});

export default route;
