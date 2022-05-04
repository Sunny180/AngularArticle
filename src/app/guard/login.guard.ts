import { Injectable, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Subscription } from 'rxjs';
import { LoginService } from '../login.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate, OnDestroy {
  private isLoggedIn!: boolean;
  private loginChange!: Subscription;

  constructor(
    private router: Router,
    private loginService: LoginService,
  ) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): true | UrlTree {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): true | UrlTree {
    this.loginChange = this.loginService.isLoggedIn().subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    if (this.isLoggedIn) {
      return true;
    }
    else {
      // 導回首頁
      return this.router.parseUrl('/articles');
    }
  }
  ngOnDestroy(): void {
    if (this.loginChange) {
      this.loginChange.unsubscribe();
    }
  }
}
