// src/index.js
import dotenv from "dotenv";
import express, { Express } from "express";
import router from "./routes/routes";
import cors from "cors";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(
  cors({
    origin: ["http://localhost:4173", "http://localhost:5173"],
  })
);
app.use(express.json());
app.use("/", router);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
