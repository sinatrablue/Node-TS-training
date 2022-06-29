import assert from "assert";
import axios from "axios";
import { Article } from "../src/interfaces/article_router";
import { WebServer } from "../src/WebServer";
import { newArticle } from "./data/articles.data";

const url = "http://localhost:23456/api/articles";

describe("WebServer", () => {
  const webServer = new WebServer({ port: 23456 });

  before(async () => {
    await webServer.start(); // You don't know how much time it's gonna take
  });
  after(async () => {
    webServer.stop();
  });

  it("should create one article", async () => {
    const response = await axios.post<{ id: string }>(url, newArticle);
    const { id } = response.data;
    const response2 = await axios.get<Article>(url + "/" + id);
    const article = response2.data;
    console.log("article: ", article);
    assert(article.id === id);
  });
});
