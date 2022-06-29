import express from "express";
import { articlesRouter } from "./articles";
import { Server } from "http";

export const api = (server: Server) => {
  const app = express.Router();

  app.use("/articles", articlesRouter(server));

  app.get("/ping", (req, res) => {
    res.json({ ping: "ok" });
  });

  return app;
};
