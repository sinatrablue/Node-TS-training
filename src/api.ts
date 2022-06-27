import express from "express";
import { articlesRouter } from "./articles";

const app = express.Router();

app.use("/articles", articlesRouter);

app.get("/test", (req, res) => {
  res.json({ test: "ok" });
});

export const api = app;
