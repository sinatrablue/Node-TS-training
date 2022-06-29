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

  deleteAllArticle(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  deleteOneArticle(id: string): Promise<void> {
    throw new Error("Method not implemented.");
  }

  async init() {
    try {
      console.log("About to connect to DB...");
      await this.sequelize.authenticate();
      console.log("Successfully connected to DB");
      this.#init();
      await this.sequelize.sync({ force: false });
      this.server.once("close", () => {
        (async () => {
          await this.sequelize.close();
        })();
      });
      this.eventEmmitter.emit("isReady");
    } catch (err) {
      console.log("err: ", err);
    }
  }

  retrieveAllArticle(): Promise<Article[]> {
    throw new Error("Method not implemented.");
  }

  async retrieveOneArticle(id: string): Promise<Article | undefined> {
    const result = await ArticleModel.findByPk(id);
    console.log("result: ", result);
    if (result === null) {
      return undefined;
    }
    const json = result.toJSON();
    const article = { ...json, id: String(json.id) };
    console.log("article: ", article);
    return article as Article;
  }
}
