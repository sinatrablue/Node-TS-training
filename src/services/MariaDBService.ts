import { Article, NewArticle } from "../interfaces/article_router";
import { Server } from "http";

import mariadb, { Pool } from "mariadb";
export class MariaDBService {
  pool: Pool;

  constructor(private server: Server) {
    // up: en déclarant avec de la visibilité ça devient un attribut de la classe
    this.pool = mariadb.createPool({
      port: Number(process.env.MYDB_PORT || 3306),
      host: process.env.MYDB_HOST || "172.17.0.1",
      user: process.env.MYDB_USER || "root",
      password: process.env.MYDB_PASSWORD || "simonot",
      database: "njs",
      connectionLimit: 5,
    });

    server.once("close", () => {
      this.pool.end();
    });
  }

  async createOneArticle(article: NewArticle): Promise<{ id: string }> {
    let conn;
    try {
      conn = await this.pool.getConnection();
      const rows = await conn.query(
        "INSERT INTO articles (name, price) VALUES (?, ?)",
        [article.name, article.price]
      );
      console.log("rows: ", rows);
      console.log("id > " + rows.insertId);
      return { id: String(rows.insertId) };
    } catch (err) {
      console.log("err: ", err);
      throw err;
    } finally {
      await conn?.end(); // ne fait que si c'est pas null ou undefined
    }
  }

  async deleteOneArticle(id: string): Promise<void> {
    let conn;
    try {
      conn = await this.pool.getConnection();
      const rows = await conn.query("delete from articles where id = ?", [id]);
      console.log("rows: ", rows);
      return;
    } catch (err) {
      console.log("err: ", err);
      throw err;
    } finally {
      await conn?.end(); // ne fait que si c'est pas null ou undefined
    }
  }

  async deleteAllArticle() {
    let conn;
    try {
      conn = await this.pool.getConnection();
      const rows = await conn.query("delete from articles");
      console.log("rows: ", rows);
      return;
    } catch (err) {
      console.log("err: ", err);
      throw err;
    } finally {
      await conn?.end(); // ne fait que si c'est pas null ou undefined
    }
  }

  async retrieveAllArticle(): Promise<Article[]> {
    let conn;
    try {
      conn = await this.pool.getConnection();
      const rows = await conn.query("SELECT * from articles");
      console.log("rows: ", rows);
      return rows.map((row: Article) => {
        return { ...row, id: String(row.id) };
      });
    } catch (err) {
      console.log("err: ", err);
      throw err;
    } finally {
      await conn?.end(); // ne fait que si c'est pas null ou undefined
    }
  }

  async retrieveOneArticle(id: string): Promise<Article | undefined> {
    let conn;
    try {
      conn = await this.pool.getConnection();
      const rows = await conn.query("SELECT * from articles WHERE id = ?", [
        id,
      ]);
      console.log("rows: ", rows);
      const article = rows[0];
      if (article === undefined) {
        return undefined;
      }
      article.id = String(article.id);
      return article;
    } catch (err) {
      console.log("err: ", err);
      throw err;
    } finally {
      await conn?.end(); // ne fait que si c'est pas null ou undefined
    }
  }
}
