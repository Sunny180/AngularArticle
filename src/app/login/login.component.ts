import { User, Login, Token } from './../article';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import jwt_decode from 'jwt-decode';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private decoded: Token = {
    Users: ''
  };
  private user: User = {
    Id: 0,
    RoleId: 0,
    Name: ''
  };

  public loginUser: Login = {
    Account: '',
    Password: ''
  };

  private set UserId(userId: number) {
    this.loginService.userId = userId;
  }
  private set RoleId(roleId: number) {
    this.loginService.roleId = roleId;
  }
  private set UserName(userName: string) {
    this.loginService.userName = userName;
  }

  constructor(
    private loginService: LoginService,
    private articleService: ArticleService,
    private router: Router
  ) { }

  public ngOnInit(): void {
  }

  public onLogin(): void {
    this.loginService.login(this.loginUser)
      .subscribe((api) => {
        const token = api.Data;
        sessionStorage.setItem('token', token);
        this.articleService.setHeaders(token);
        this.loginService.setHeaders(token);
        this.decoded = jwt_decode(token);
        this.user = JSON.parse(this.decoded.Users);
        this.UserId = this.user.Id;
        this.RoleId = this.user.RoleId;
        this.UserName = this.user.Name;
        this.loginService.isLoginSubject.next(true);
        this.loginService.roleIdSubject.next(this.user.RoleId);
        this.loginService.userIdSubject.next(this.user.Id);
        this.articleService.authorIdSubject.next(this.user.Id);
        this.loginService.userNameSubject.next(this.user.Name);
        this.router.navigateByUrl('/articles');
      }
      );
  }
}
