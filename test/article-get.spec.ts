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

  it("should get all articles", async () => {
    const response = await axios.get(url);
    const articles = response.data as Article[];
    assert(articles instanceof Array);
  });
  /*
  it.only("should get one article", async () => {
    const response = await axios.get(url);
    const articles = response.data as Article[];
    assert(articles.length >= 2);

    await axios.delete(url);

    assert(articles.length === 0);
  });*/
});
