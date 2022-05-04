import { PostArticle } from 'src/app/article';
import { ArticleService } from '../article.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { LoginService } from 'src/app/login.service';


@Component({
  selector: 'app-article-new',
  templateUrl: './article-new.component.html',
  styleUrls: ['./article-new.component.css']
})
export class ArticleNewComponent implements OnInit {

  constructor(
    private articleService: ArticleService,
    private loginService: LoginService,
    private location: Location
  ) { }

  public ngOnInit(): void {
  }

  public onGoBack():void{
    this.goBack();
  }

  public onAddArticle(Title: string, Content: string): void {
    const UserId = this.loginService.userId;
    const AdminId = this.loginService.userId;
    if (!Title) {
      alert('忘記填標題囉');
    } else if (!Content) {
      alert('忘記填內容囉');
    } else {
      if (confirm('確定要新增嗎?')) {
        this.articleService.addArticle({ Title, Content, UserId, AdminId } as PostArticle)
          .subscribe((api) => {
            this.goBack();
          });
      } else { }
    }
  }

  private goBack(): void {
    this.location.back();
  }
}
