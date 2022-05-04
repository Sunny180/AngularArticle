import { LoginService } from 'src/app/login.service';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Api, GetArticle, Author, GetArticles, PutArticle, PostArticle } from './article';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, filter, map } from 'rxjs/operators';
import { Status } from './status';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  private api = '/api';
  public Articles!: GetArticle[];
  public authorId!: number;
  public keyword!: string;
  public searchTitle!: string;
  public active: number = 1;
  public authorIdSubject = new BehaviorSubject<number>(0);
  private articles: BehaviorSubject<GetArticles[]> = new BehaviorSubject<GetArticles[]>([]);
  private article: BehaviorSubject<GetArticle> = new BehaviorSubject<GetArticle>({
    Id: 0,
    Title: '',
    Content: '',
    UserId: 0,
    Name: '',
    CreateTime: '',
    UpdateTime: '',
    AdminId: 0
  });
  private author: BehaviorSubject<Author[]> = new BehaviorSubject<Author[]>([]);

  public getAuthorId(): Observable<number> {
    return this.authorIdSubject.asObservable();
  }
  public set(id: number): void {
    this.authorIdSubject.next(id);
  }

  public setHeaders(token: string): void {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${token}`);
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (): Observable<T> => {
      return of(result as T);
    };
  };
  private httpOptions = {
    headers: new HttpHeaders({
      Authorization: ``
    })
  };

  constructor(
    private http: HttpClient,
    private loginService: LoginService,
  ) { }

  /** GET Articles from the server */
  public getArticles(id?: number, keyword?: string): Observable<GetArticles[]> {
    const url = `${this.api}/articles`;
    let res = new Observable<Api<GetArticles[]>>();
    if (id && keyword) {
      res = this.http.get<Api<GetArticles[]>>(url, { params: { userId: id, keyword: keyword } });
    }
    else if (id && !keyword) {
      res = this.http.get<Api<GetArticles[]>>(url, { params: { userId: id } });
    }
    else if (id === 0 && keyword) {
      res = this.http.get<Api<GetArticles[]>>(url, { params: { keyword: keyword } });
    }
    else {
      res = this.http.get<Api<GetArticles[]>>(url);
    }
    res.pipe(
      filter(api => {
        if (api.StatusCode !== Status.success) {
          alert(`${api.Message}`);
          return false;
        } else {
          return true;
        }
      }),
      map(res => {
        return res.Data;
      }),
      catchError(this.handleError<GetArticles[]>('getArticles'))
    ).subscribe(data => {
      if (!data) {
        this.articles.next([]);
      } else {
        this.articles.next(data);
      }
    });
    return this.articles;
  }

  /** GET Articles from the server */
  public getArticlesB(id?: number, keyword?: string): Observable<GetArticles[]> {
    const url = `${this.api}/articles`;
    let res = new Observable<Api<GetArticles[]>>();
    if (id && keyword) {
      res = this.http.get<Api<GetArticles[]>>(url, { params: { userId: id, keyword: keyword } });
    }
    else if (id && !keyword) {
      res = this.http.get<Api<GetArticles[]>>(url, { params: { userId: id } });
    }
    else if (id === 0 && keyword) {
      res = this.http.get<Api<GetArticles[]>>(url, { params: { keyword: keyword } });
    }
    else {
      res = this.http.get<Api<GetArticles[]>>(url);
    }
    return res.pipe(
      filter(api => {
        if (api.StatusCode !== Status.success) {
          alert(`${api.Message}`);
          return false;
        } else {
          return true;
        }
      }),
      map(({Data}) => Data),
      catchError(this.handleError<GetArticles[]>('getArticles'))
    );
    // .subscribe(data => {
    //   if (!data) {
    //     this.articles.next([]);
    //   } else {
    //     this.articles.next(data);
    //   }
    // });
    // return this.articles;
  }

  /** GET article by id. Will 404 if id not found */
  public getArticle(id: number): Observable<GetArticle> {
    const url = `${this.api}/articles/${id}`;
    this.http.get<Api<GetArticle>>(url).pipe(
      filter(api => {
        if (api.StatusCode !== Status.success) {
          alert(`${api.Message}`);
          return false;
        } else {
          return true;
        };
      }),
      catchError(this.handleError<Api<GetArticle>>(`getArticle id=${id}`))
    ).subscribe(res => {
      if (!res) {
        this.article.next({
          Id: 0,
          Title: '',
          Content: '',
          UserId: 0,
          Name: '',
          CreateTime: '',
          UpdateTime: '',
          AdminId: 0
        });
      } else {
        this.article.next(res.Data);
      }
    });
    return this.article;
  };

  /** GET authors from the server */
  public getAuthors(): Observable<Author[]> {
    const url = `${this.api}/authors`;
    this.http.get<Api<Author[]>>(url, { headers: this.httpOptions.headers }).pipe(
      filter(api => {
        if (api.StatusCode !== Status.success) {
          if ((api.StatusCode === Status.invalid_token) || (api.StatusCode === Status.login_timeout)) {
            this.loginService.timeOut();
            alert(`${api.Message}`);
          } else {
            alert(`${api.Message}`);
          }
          return false;
        } else {
          return true;
        }
      }),
      catchError(this.handleError<Api<Author[]>>('getAuthors'))
    ).subscribe(res => {
      if (!res) {
        this.author.next([]);
      } else {
        this.author.next(res.Data);
      }
    });
    return this.author;
  }

  /** DELETE: delete the article from the server */
  public deleteArticle(id: number): Observable<Api<string>> {
    const url = `${this.api}/articles/${id}`;
    return this.http.delete<Api<string>>(url, { headers: this.httpOptions.headers }).pipe(
      filter(api => {
        if (api.StatusCode !== Status.success) {
          if ((api.StatusCode === Status.invalid_token) || (api.StatusCode === Status.login_timeout)) {
            this.loginService.timeOut();
            alert(`${api.Message}`);
          } else {
            alert(`${api.Message}`);
          }
          return false;
        } else {
          alert(`${api.Message}`);
          return true;
        }
      }),
      catchError(this.handleError<Api<string>>('deleteArticle'))
    );
  }

  /** DELETE: delete the author from the server */
  public deleteAuthor(id: number): Observable<Api<string>> {
    const url = `${this.api}/authors/${id}`;
    return this.http.delete<Api<string>>(url, { headers: this.httpOptions.headers }).pipe(
      filter(api => {
        if (api.StatusCode !== Status.success) {
          if ((api.StatusCode === Status.invalid_token) || (api.StatusCode === Status.login_timeout)) {
            this.loginService.timeOut();
            alert(`${api.Message}`);
          } else {
            alert(`${api.Message}`);
          }
          return false;
        } else {
          alert(`${api.Message}`);
          return true;
        }
      }),
      catchError(this.handleError<Api<string>>('deleteAuthor'))
    );
  }

  /** POST: add a new article to the server */
  public addArticle(article: PostArticle): Observable<Api<string>> {
    const url = `${this.api}/articles`;
    return this.http.post<Api<string>>(url, article, { headers: this.httpOptions.headers }).pipe(
      filter(api => {
        if (api.StatusCode !== Status.success) {
          if ((api.StatusCode === Status.invalid_token) || (api.StatusCode === Status.login_timeout)) {
            this.loginService.timeOut();
            alert(`${api.Message}`);
          } else {
            alert(`${api.Message}`);
          }
          return false;
        } else {
          alert(`${api.Message}`);
          return true;
        }
      }),
      catchError(this.handleError<Api<string>>('addArticle'))
    );
  }

  /** PUT: update the article on the server */
  public updateArticle(article: PutArticle): Observable<Api<string>> {
    const url = `${this.api}/articles/${article.Id}`;
    return this.http.put<Api<string>>(url, article, { headers: this.httpOptions.headers }).pipe(
      filter(api => {
        if (api.StatusCode !== Status.success) {
          if ((api.StatusCode === Status.invalid_token) || (api.StatusCode === Status.login_timeout)) {
            this.loginService.timeOut();
            alert(`${api.Message}`);
          } else {
            alert(`${api.Message}`);
          }
          return false;
        } else {
          alert(`${api.Message}`);
          return true;
        }
      }),
      catchError(this.handleError<Api<string>>('updateArticle'))
    );
  }
  /** PUT: update the author on the server */
  public updateAuthor(author: Author): Observable<Api<string>> {
    const url = `${this.api}/authors/${author.Id}`;
    return this.http.put<Api<string>>(url, author, { headers: this.httpOptions.headers }).pipe(
      filter(api => {
        if (api.StatusCode !== Status.success) {
          if ((api.StatusCode === Status.invalid_token) || (api.StatusCode === Status.login_timeout)) {
            this.loginService.timeOut();
            alert(`${api.Message}`);
          } else {
            alert(`${api.Message}`);
          }
          return false;
        } else {
          alert(`${api.Message}`);
          return true;
        }
      }),
      catchError(this.handleError<Api<string>>('updateAuthor'))
    );
  }
}
