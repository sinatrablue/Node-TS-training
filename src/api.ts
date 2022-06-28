import express from "express";
import { articlesRouter } from "./articles";

const app = express.Router();

app.use("/articles", articlesRouter);

app.get("/ping", (req, res) => {
  res.json({ ping: "ok" });
});

export const api = app;
