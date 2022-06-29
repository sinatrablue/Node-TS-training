import { Server } from "http";
import { Sequelize } from "sequelize";
import { NewArticle, Article } from "../interfaces/article_router";
import { articleDefinitions, ArticleModel } from "../models/ArticleModel";
import { AbstractService } from "./AbstractService";

export class SequelizeService extends AbstractService {
  sequelize = new Sequelize(
    process.env.MYDB_URI || "mariadb://root:simonot@172.17.0.1:3306/njs_2"
  );

  constructor(server: Server) {
    super(server);
  }

  #init() {
    console.log("init...");
    ArticleModel.init(articleDefinitions, { sequelize: this.sequelize });
  }

  async createOneArticle(newArticle: NewArticle): Promise<{ id: string }> {
    console.log("create one article");
    const result = await ArticleModel.create(newArticle);
    console.log("result: ", result);
    const id = result.id;
    return { id: String(id) };
  }

  async deleteAllArticle(): Promise<void> {
    try {
      await ArticleModel.destroy({ where: {}, truncate: false });
    } catch (err) {
      console.log("err: ", err);
      throw err;
    }
  }

  async deleteOneArticle(id: string): Promise<void> {
    try {
      await ArticleModel.destroy({ where: { id: id } });
    } catch (err) {
      console.log("err: ", err);
      throw err;
    }
  }

  async init() {
    let alreadyClosed = false;
    try {
      this.server.once("close", () => {
        (async () => {
          alreadyClosed = true;
          await this.sequelize.close();
        })();
      });
      console.log("About to connect to DB...");
      if (alreadyClosed) {
        return;
      }
      await this.sequelize.authenticate();
      console.log("Successfully connected to DB");
      this.#init();
      await this.sequelize.sync({ force: false });
      this.eventEmmitter.emit("isReady");
    } catch (err) {
      console.log("err: ", err);
      throw err;
    }
  }

  async retrieveAllArticle(): Promise<Article[]> {
    try {
      const result = await ArticleModel.findAll();
      console.log("result: ", result);
      const articles = result.map((am) => {
        const json = am.toJSON();
        const article = { ...json, id: String(json.id) };
        return article;
      });
      return articles;
    } catch (err) {
      console.log("err: ", err);
      throw err;
    }
  }

  async retrieveOneArticle(id: string): Promise<Article | undefined> {
    try {
      const result = await ArticleModel.findByPk(id);
      console.log("result: ", result);
      if (result === null) {
        return undefined;
      }
      const json = result.toJSON();
      const article = { ...json, id: String(json.id) };
      console.log("article: ", article);
      return article as Article;
    } catch (err) {
      console.log("err: ", err);
      throw err;
    }
  }
}
