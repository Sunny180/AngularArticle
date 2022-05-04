import { ArticleService } from 'src/app/article.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {
  public active: number = 0;
  private isLoggedIn!: Observable<boolean>;
  private roleId!: Observable<number>;
  private userId: number = 0;
  private userName!: Observable<string>;

  public get IsLoggedIn(): Observable<boolean> {
    return this.isLoggedIn;
  }
  public get RoleId(): Observable<number> {
    return this.roleId;
  }
  public get UserName(): Observable<string> {
    return this.userName;
  }
  private set UserId(userId: number) {
    this.userId = userId;
  }
  private set Active(active: number) {
    this.active = active;
  }
  private set RoleId(roleId: Observable<number>) {
    this.roleId = roleId;
  }
  private set UserName(userName: Observable<string>) {
    this.userName = userName;
  }
  private set IsLoggedIn(status: Observable<boolean>) {
    this.isLoggedIn = status;
  }

  constructor(
    private loginService: LoginService,
    public router: Router,
    private articleService: ArticleService
  ) {
    this.Active = 1;
    this.IsLoggedIn = loginService.isLoggedIn();
    this.RoleId = loginService.getRoleId();
    this.UserName = loginService.getUserName();
    this.loginService.getUserId().subscribe(value => {
      this.UserId = value;
    });
  }

  public ngOnInit(): void {
    const active = sessionStorage.getItem('active');
    if (active) {
      this.Active = Number(active);
    }
  }

  public onSetAuthorId(): void {
    this.articleService.set(this.userId);
  }

  public onLogout() {
    this.loginService.logout(this.loginService.userId)
      .subscribe(() => {
        const redirectUrl = '/articles';
        this.router.navigate([redirectUrl]);
        this.loginService.isLoginSubject.next(false);
        this.loginService.roleIdSubject.next(0);
        this.loginService.userIdSubject.next(0);
        this.loginService.userNameSubject.next('');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('page');
        this.Active = 1;
        sessionStorage.setItem('active', '1');
      });
  }

  public onSetActiveId() {
    this.setActiveId();
  }

  public setActiveId() {
    sessionStorage.setItem('active', this.active.toString());
  }

}
