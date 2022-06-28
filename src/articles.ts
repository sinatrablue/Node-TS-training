import express from "express";
import { Article } from "./interfaces/article_router";
const app = express.Router();

const generateId = (): string => {
  return String(Math.floor(Math.random() * 1e12));
};

const articles: Article[] = [
  { id: "0", name: "flat bottomed wok", price: 15 },
  { id: "1", name: "sesame oil 1L", price: 12 },
  { id: "2", name: "sichuan peppercorns", price: 3.5 },
  { id: "3", name: "long facing heaven", price: 5 },
];

app.get("/", (req, res) => {
  res.json(articles);
});

app.get("/:id", (req, res) => {
  const id = req.params.id;
  const art = articles.find((a) => a.id === id);
  if (art === undefined) {
    res.status(404).end();
    return;
  } else {
    res.json(art);
  }
});

app.use(express.json());

app.post("/", (req, res) => {
  try {
    const art = req.body as Article; // We suppose that it's an Article, no checks gonna be made
    art.id = generateId();
    articles.push(art);
    res.status(200).json(art.id);
  } catch (err) {
    console.log("err :::> ", err);
    res.status(500).end();
  }
});

export const articlesRouter = app;
