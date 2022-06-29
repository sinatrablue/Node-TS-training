import express from "express";
import { Article } from "./interfaces/article_router";
import { Server } from "http";
import { SequelizeService } from "./services/SequalizeService";

export const articlesRouter = (server: Server) => {
  const service = new SequelizeService(server);

  let isReady = false;
  (async () => {
    await service.init();
    isReady = true;
  })();

  const app = express.Router();

  app.use((req, res, next) => {
    if (isReady) {
      next();
    }
    service.eventEmmitter.on("isReady", () => {
      console.log("received isReady");
      isReady = true;
      next();
    });
  });

  app.get("/", (req, res) => {
    (async () => {
      try {
        const articles = await service.retrieveAllArticle();
        res.json(articles);
      } catch (err) {
        console.log("err :::> ", err);
        res.status(500).end();
      }
    })();
  });

  app.get("/:id", (req, res) => {
    (async () => {
      try {
        const id = req.params.id;
        const art = await service.retrieveOneArticle(id);
        if (art === undefined) {
          res.status(404).end();
          return;
        } else {
          res.json(art);
        }
      } catch (err) {
        console.log("err: ", err);
      }
    })();
  });

  app.use(express.json());

  app.post("/", (req, res) => {
    (async () => {
      try {
        const article = req.body as Article;
        const { id } = await service.createOneArticle(article);
        res.status(201).json({ id });
      } catch (err) {
        console.log("err: ", err);
      }
    })();
  });

  app.delete("/", (req, res) => {
    (async () => {
      try {
        await service.deleteAllArticle();
        res.status(204).end();
      } catch (err) {
        console.log("err :::> ", err);
        res.status(500).end();
      }
    })();
  });

  app.delete("/:id", (req, res) => {
    (async () => {
      try {
        const id = req.params.id;
        await service.deleteOneArticle(id);
        res.status(204).end();
      } catch (err) {
        console.log("err :::> ", err);
        res.status(500).end();
      }
    })();
  });

  return app;
};
