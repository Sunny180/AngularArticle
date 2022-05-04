import { ArticleService } from '../article.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Location } from '@angular/common';
import { GetArticle } from '../article';
import { ActivatedRoute } from '@angular/router';
import { LoginService } from '../login.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit, OnDestroy {
  private article: GetArticle = {
    Id: 0,
    Title: '',
    Content: '',
    UserId: 0,
    Name: '',
    CreateTime: '',
    UpdateTime: '',
    AdminId: 0,
  };
  private roleId: number = 0;
  private userId: number = 0;
  private articleSubject!: Subscription;

  public get Article(): GetArticle {
    return this.article;
  }
  public get RoleId(): number {
    return this.roleId;
  }
  public get UserId(): number {
    return this.userId;
  }
  private set RoleId(roleId: number) {
    this.roleId = roleId;
  }
  private set UserId(userId: number) {
    this.userId = userId;
  }
  private set Article(article: GetArticle) {
    this.article = article;
  }
  private set Content(content: string) {
    this.article.Content = content;
  }

  constructor(
    private articleService: ArticleService,
    private location: Location,
    private route: ActivatedRoute,
    private loginService: LoginService,
  ) {
    this.RoleId = this.loginService.roleId;
    this.UserId = this.loginService.userId;
  }

  public ngOnInit(): void {
    this.getArticle();
  }
  public ngOnDestroy(): void {
    this.articleSubject.unsubscribe();
  }

  public onGoBack(): void {
    this.goBack();
  }

  public onDelete(articleId: number): void {
    if (confirm('確實要刪除嗎?')) {
      this.articleService.deleteArticle(articleId).subscribe((api) => {
        this.goBack();
      });
    } else { }
  }

  private getArticle(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.articleSubject = this.articleService.getArticle(id)
      .subscribe(article => {
        this.Article = article;
        this.Content = (this.article.Content).replace(/<br>/g, '\n');
      });
  }

  private goBack(): void {
    this.location.back();
  }

}


