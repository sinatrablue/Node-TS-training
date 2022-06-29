import { Article, NewArticle } from "../interfaces/article_router";
import mariadb from "mariadb";

const pool = mariadb.createPool({
  port: Number(process.env.MYDB_PORT || 3306),
  host: process.env.MYDB_HOST || "172.17.0.1",
  user: process.env.MYDB_USER || "root",
  password: process.env.MYDB_PASSWORD || "simonot",
  database: "njs",
  connectionLimit: 5,
});

export class MariaDBService {
  async createOneArticle(article: NewArticle): Promise<{ id: string }> {
    let conn;
    try {
      conn = await pool.getConnection();
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

  async retrieveAllArticle(): Promise<Article[]> {
    let conn;
    try {
      conn = await pool.getConnection();
      const rows = await conn.query("SELECT * from articles");
      console.log("rows: ", rows);
      return [];
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
      conn = await pool.getConnection();
      const rows = await conn.query("SELECT * from articles WHERE id = ?", [
        id,
      ]);
      console.log("rows: ", rows);
      const article = rows[0];
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
