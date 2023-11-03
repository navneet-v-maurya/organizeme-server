import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

import connectMongoDB from "./src/database/mongo.js";
import my_task from "./src/routes/my_task.js";
import auth from "./src/routes/auth.js";

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));

app.use("/my_task", my_task);
app.use("/auth", auth);

connectMongoDB();
app.listen(process.env.PORT, () => {
  console.log(`Server connected at Port: ${process.env.PORT}`);
});
