import express from "express";
import { Article } from "./interfaces/article_router";
import { MariaDBService } from "./services/MariaDBService";
import { Server } from "http";

export const articlesRouter = (server: Server) => {
  const app = express.Router();

  const articles: Article[] = [
    { id: "0", name: "flat bottomed wok", price: 15 },
    { id: "1", name: "sesame oil 1L", price: 12 },
    { id: "2", name: "sichuan peppercorns", price: 3.5 },
    { id: "3", name: "long facing heaven", price: 5 },
  ];

  const service = new MariaDBService(server);

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
