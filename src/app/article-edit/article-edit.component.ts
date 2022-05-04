import { GetArticle, PutArticle } from 'src/app/article';
import { LoginService } from 'src/app/login.service';
import { ArticleService } from '../article.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent implements OnInit, OnDestroy {
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
  private putArticle: PutArticle = {
    Id: 0,
    Title: '',
    Content: '',
    AdminId: 0,
  };
  private articleSubject!: Subscription;

  public get Article(): GetArticle {
    return this.article;
  }
  private set PutArticle(putArticle: PutArticle) {
    this.putArticle = putArticle;
  }

  constructor(
    private articleService: ArticleService,
    private location: Location,
    private loginService: LoginService,
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.getArticle();
  }

  public ngOnDestroy(): void {
    this.articleSubject.unsubscribe();
  }

  public onSave(): void {
    if (!this.article.Title) {
      alert('沒有標題');
    } else if (!this.article.Content) {
      alert('沒有內容');
    } else {
      this.PutArticle = {
        AdminId: this.loginService.userId,
        Content: this.article.Content,
        Title: this.article.Title,
        Id: this.article.Id
      };
      if (confirm('確定要修改嗎?')) {
        this.articleService.updateArticle(this.putArticle)
          .subscribe(() => {
            this.goBack();
          });
      } else { }
    }
  }

  public onGoBack(): void {
    this.goBack();
  }

  private getArticle(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.articleSubject = this.articleService.getArticle(id)
      .subscribe(article => {
        this.article = article;
      });
  }

  private goBack(): void {
    this.location.back();
  }

}
