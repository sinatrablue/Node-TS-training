import { Article, NewArticle } from "../interfaces/article_router";

import { Server } from "http";
import EventEmitter from "events";

export abstract class AbstractService {
  eventEmmitter = new EventEmitter();

  constructor(protected server: Server) {}

  abstract createOneArticle(article: NewArticle): Promise<{ id: string }>;
  abstract deleteAllArticle(): Promise<void>;
  abstract deleteOneArticle(id: string): Promise<void>;
  abstract retrieveAllArticle(): Promise<Article[]>;
  abstract retrieveOneArticle(id: string): Promise<Article | undefined>;
}
