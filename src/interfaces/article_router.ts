export interface Article {
  id: string;
  name: string;
  price: number;
}

export type NewArticle = Omit<Article, "id">;
