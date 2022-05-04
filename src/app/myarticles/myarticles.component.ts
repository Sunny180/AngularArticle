import { GetArticles } from 'src/app/article';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { ArticleService } from '../article.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-myarticles',
  templateUrl: './myarticles.component.html',
  styleUrls: ['./myarticles.component.css']
})
export class MyarticlesComponent implements OnInit, OnDestroy {

  private articles: GetArticles[] = [];
  public page: number = 0;
  private pageSize: number = 0;
  private maxSize: number = 0;
  private userId: number = 0;
  private roleId: number = 0;
  public keyword: string = '';
  private isLoggedIn!: Observable<boolean>;
  private authorChange!: Subscription;
  private articlesSubject!: Subscription;

  public get Articles(): GetArticles[] {
    return this.articles;
  }
  public get PageSize(): number {
    return this.pageSize;
  }
  public get MaxSize(): number {
    return this.maxSize;
  }
  public get UserId(): number {
    return this.userId;
  }
  public get RoleId(): number {
    return this.roleId;
  }
  public get IsLoggedIn(): Observable<boolean> {
    return this.isLoggedIn;
  }
  private set IsLoggedIn(status: Observable<boolean>) {
    this.isLoggedIn = status;
  }
  private set Articles(articles: GetArticles[]) {
    this.articles = articles;
  }
  private set Page(page: number) {
    this.page = page;
  }
  private set PageSize(pageSize: number) {
    this.pageSize = pageSize;
  }
  private set MaxSize(maxSize: number) {
    this.maxSize = maxSize;
  }
  private set UserId(userId: number) {
    this.userId = userId;
  }
  private set RoleId(roleId: number) {
    this.roleId = roleId;
  }
  private set Keyword(keyword: string) {
    this.keyword = keyword;
  }

  constructor(
    private articleService: ArticleService,
    private loginService: LoginService,
    private router: Router
  ) {
    this.IsLoggedIn = loginService.isLoggedIn();
    this.RoleId = this.loginService.roleId;
    this.UserId = this.loginService.userId;
    this.Page = 1;
    this.PageSize = 5;
    this.MaxSize = 3;
  }

  public ngOnInit(): void {
    if (this.articleService.searchTitle) {
      this.Keyword = this.articleService.searchTitle;
      this.getArticles();
    } else {
      this.getArticles();
    }
  }
  public ngOnDestroy(): void {
    if (this.authorChange) {
      this.authorChange.unsubscribe();
    }
    this.articlesSubject.unsubscribe();
  }

  public onDelete(articleId: number): void {
    if (confirm('確實要刪除嗎?')) {
      this.articleService.deleteArticle(articleId).subscribe((api) => {
        this.Articles = this.articles.filter(a => a.Id !== articleId);
      });
    } else { }
  }

  public onSetPage(page: number): void {
    this.setPage(page);
  }

  public onGetArticles(): void {
    this.getArticles();
  }

  private getArticles(): void {
    this.articleService.searchTitle = this.keyword;
    this.authorChange = this.articleService.getAuthorId()
      .subscribe(authorId => {
        this.articlesSubject = this.articleService.getArticles(authorId, this.keyword)
          .subscribe(articles => {
            this.Articles = articles;
            if (sessionStorage.getItem('page') === null) {
              sessionStorage.setItem('page', '1');
            } else {
              this.setPage(Number(sessionStorage.getItem('page')));
            }
          });
      });
  }

  private setPage(page: number): void {
    sessionStorage.setItem('page', page.toString());
    this.Page = page;
    this.router.navigate(['/myarticles'], { queryParams: { page: this.page } });
  }
}

// private rooterChange!: Subscription;
// this.rooterChange = this.router.events.subscribe((event) => {
//   if (event instanceof NavigationEnd) {
//     this.getArticles();
//     console.log(event.url);
//     const page = (event.url).split('=');
//     console.log(page[1]);
//     this.setPage(+page[1]);
//   }
// });

// ngOnDestroy(): void {
//   if (this.rooterChange) {
//     this.rooterChange.unsubscribe();
//   }
// }
