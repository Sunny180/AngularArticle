import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { GetArticles } from '../article';
import { ArticleService } from '../article.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoginService } from 'src/app/login.service';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})


export class ArticlesComponent implements OnInit, OnDestroy {

  private articles: GetArticles[] = [];
  public page: number = 0;
  public keyword: string = '';
  private pageSize: number = 0;
  private maxSize: number = 0;
  private userId: number = 0;
  private roleId: number = 0;
  private searchText: string = '';
  private isLoggedIn: Observable<boolean>;
  private articlesSubject!: Subscription;

  public get Articles(): GetArticles[] {
    return this.articles;
  }
  public get MaxSize(): number {
    return this.maxSize;
  }
  public get PageSize(): number {
    return this.pageSize;
  }
  public get UserId(): number {
    return this.userId;
  }
  public get RoleId(): number {
    return this.roleId;
  }
  public get SearchText(): string {
    return this.searchText;
  }
  public get IsLoggedIn(): Observable<boolean> {
    return this.isLoggedIn;
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
    this.isLoggedIn = loginService.isLoggedIn();
    this.RoleId = this.loginService.roleId;
    this.UserId = this.loginService.userId;
    this.Page = 1;
    this.PageSize = 4;
    this.MaxSize = 3;
  }

  public ngOnInit(): void {
    if (this.articleService.keyword) {
      this.Keyword = this.articleService.keyword;
      this.getArticles();
    } else {
      this.getArticles();
    }
  }

  public ngOnDestroy(): void {
    this.articlesSubject.unsubscribe();
  }

  public check(userId: number, roleId: number, art_userId: number): boolean {
    if ((roleId === 2) && (userId !== art_userId)) {
      return true;
    } else {
      return false;
    }
  }

  public onSearch(): void {
    this.getArticles();
  }

  public onDelete(articleId: number): void {
    if (confirm('確實要刪除嗎?')) {
      this.articleService.deleteArticle(articleId).subscribe((api) => {
        this.Articles = this.articles.filter(a => a.Id !== articleId);
      });
    } else { }
  }

  public setPage(page: number): void {
    sessionStorage.setItem('page', page.toString());
    this.Page = page;
    this.router.navigate(['/articles'], { queryParams: { page: this.page } });
  }

  private getArticles(): void {
    this.articleService.keyword = this.keyword;
    this.articlesSubject = this.articleService.getArticles(0, this.keyword)
      .subscribe(articles => {
        this.Articles = articles;
        if (sessionStorage.getItem('page') === null) {
          sessionStorage.setItem('page', '1');
        } else {
          this.setPage(Number(sessionStorage.getItem('page')));
        }
      });
  }
}


