export interface GetArticles {
  Id: number;
  Title: string;
  UserId: number;
  Name: string;
}

export interface GetArticle {
  Id: number;
  Title: string;
  Content: string;
  UserId: number;
  Name: string;
  CreateTime: string;
  UpdateTime: string;
  AdminId: number;
}

export interface PutArticle {
  Id: number;
  Title: string;
  Content: string;
  AdminId: number;
}

export interface PostArticle {
  Title: string;
  Content: string;
  UserId: number;
  AdminId: number;
}

export interface Author {
  Id: number;
  Name: string;
  AdminId: number;
}
export interface Login {
  Account: string;
  Password: string;
}
export interface User {
  Id: number;
  RoleId: number;
  Name: string;
}
export interface Api<T> {
  StatusCode: number;
  Message: string;
  Data: T;
}
export interface Token {
  Users : string;
}



