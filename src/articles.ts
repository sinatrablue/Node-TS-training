import express from "express";
import { Article } from "./interfaces/article_router";
import { MariaDBService } from "./services/MariaDBService";
const app = express.Router();

/**
  const generateId = (): string => {
    return String(Math.floor(Math.random() * 1e12));
  };
*/

const articles: Article[] = [
  { id: "0", name: "flat bottomed wok", price: 15 },
  { id: "1", name: "sesame oil 1L", price: 12 },
  { id: "2", name: "sichuan peppercorns", price: 3.5 },
  { id: "3", name: "long facing heaven", price: 5 },
];

const service = new MariaDBService();

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
  try {
    articles.length = 0;
    res.status(204).end();
  } catch (err) {
    console.log("err :::> ", err);
    res.status(500).end();
  }
});

app.delete("/:id", (req, res) => {
  try {
    const id = req.params.id;
    articles.filter((a) => a.id !== id);
    res.status(204).end();
  } catch (err) {
    console.log("err :::> ", err);
    res.status(500).end();
  }
});

export const articlesRouter = app;
