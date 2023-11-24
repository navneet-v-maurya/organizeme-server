import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

import connectMongoDB from "./src/database/mongo.js";
import my_task from "./src/routes/my_task.js";
import auth from "./src/routes/auth.js";
import task_team from "./src/routes/task_team.js";
import group_task from "./src/routes/group_task.js";
import graph_data from "./src/routes/graph_data.js";

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));

app.use("/my_task", my_task);
app.use("/auth", auth);
app.use("/group_task", group_task);
app.use("/task_team", task_team);
app.use("/graph_data", graph_data);

connectMongoDB();
app.listen(process.env.PORT, () => {
  console.log(`Server connected at Port: ${process.env.PORT}`);
});
