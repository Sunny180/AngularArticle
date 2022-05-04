import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Api, Login } from './article';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, filter } from 'rxjs/operators';
import { Router } from '@angular/router';
import { Status } from './status';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public userId!: number;
  public roleId!: number;
  public userName!: string;
  private api = '/api';

  private hasToken(): boolean {
    return !!sessionStorage.getItem('token');
  }
  public isLoggedIn(): Observable<boolean> {
    return this.isLoginSubject.asObservable();
  }
  public getRoleId(): Observable<number> {
    return this.roleIdSubject.asObservable();
  }
  public getUserId(): Observable<number> {
    return this.userIdSubject.asObservable();
  }
  public getUserName(): Observable<string> {
    return this.userNameSubject.asObservable();
  }
  public setHeaders(token: string): void {
    this.httpOptions.headers = this.httpOptions.headers.set('Authorization', `Bearer ${token}`);
  };

  private handleError<T>(operation = 'operation', result?: T) {
    return (): Observable<T> => {
      return of(result as T);
    };
  };
  public httpOptions = {
    headers: new HttpHeaders({
      Authorization: ``
    })
  };

  public isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
  public roleIdSubject = new BehaviorSubject<number>(0);
  public userIdSubject = new BehaviorSubject<number>(0);
  public userNameSubject = new BehaviorSubject<string>('');

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  /** POST account,password from the server  */
  public login(login: Login): Observable<Api<string>> {
    const url = `${this.api}/users/login`;
    return this.http.post<Api<string>>(url, login).pipe(
      filter(api => {
        if (api.StatusCode !== Status.success) {
          alert(`${api.Message}`);
          return false;
        } else {
          alert(`${api.Message}`);
          return true;
        }
      }),
      catchError(this.handleError<Api<string>>('login'))
    );
  }

  public logout(id: number): Observable<Api<string>> {
    const url = `${this.api}/users/logout`;
    return this.http.post<Api<string>>(url, { userId: id }, { headers: this.httpOptions.headers }).pipe(
      filter(api => {
        if (api.StatusCode !== Status.success) {
          if ((api.StatusCode === Status.invalid_token)||(api.StatusCode === Status.login_timeout)) {
            this.timeOut();
          } else {
            alert(`${api.Message}`);
          }
          return false;
        } else {
          alert(`${api.Message}`);
          return true;
        }
      }),
      catchError(this.handleError<Api<string>>('logout'))
    );
  }

  public timeOut(): void {
    const redirectUrl = '/articles';
    this.router.navigate([redirectUrl]);
    this.isLoginSubject.next(false);
    this.roleIdSubject.next(0);
    this.userIdSubject.next(0);
    this.userNameSubject.next('');
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('page');
    sessionStorage.removeItem('active');
  };
}


