import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";

dotenv.config();

import connectMongoDB from "./src/database/mongo.js";
import todo from "./src/routes/todo.js";

const app = express();

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ extended: false, limit: "50mb" }));

app.use("/todo", todo);

connectMongoDB();
app.listen(process.env.PORT, () => {
  console.log(`Server connected at Port: ${process.env.PORT}`);
});
