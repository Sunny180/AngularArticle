import { Token, User } from './article';
import { Component } from '@angular/core';
import { LoginService } from './login.service';
import jwt_decode from 'jwt-decode';
import { ArticleService } from './article.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private title = 'my-article';
  private decoded: Token = {
    Users: ''
  };
  private user: User = {
    Id: 0,
    RoleId: 0,
    Name: ''
  };

  constructor(
    private loginService: LoginService,
    private articleService: ArticleService,
  ) {
    const token = sessionStorage.getItem('token');
    if (token) {
      console.log(sessionStorage.getItem('token'));
      this.decoded = jwt_decode(sessionStorage.token);
      this.articleService.setHeaders(token);
      this.loginService.setHeaders(token);
      this.user = JSON.parse(this.decoded.Users);
      this.loginService.userId = this.user.Id;
      this.loginService.roleId = this.user.RoleId;
      this.loginService.userName = this.user.Name;
      this.loginService.isLoginSubject.next(true);
      this.loginService.roleIdSubject.next(this.user.RoleId);
      this.loginService.userIdSubject.next(this.user.Id);
      this.loginService.userNameSubject.next(this.user.Name);
      this.articleService.set(this.user.Id);
    } else {
      return;
    }
  }

  public get Title(): string {
    return this.title;
  }
}
