import { Injectable, Inject, OnInit } from '@angular/core';
import { Http, Headers }              from '@angular/http';
import { Router }                     from '@angular/router';
import { Subject }                    from 'rxjs/Subject';
import { APP_CONFIG, AppConfig }      from '../app.config';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService implements OnInit {
  public accessToken: string;
  public isLoggedIn: boolean = false;
  public isLoggedInChange: Subject<boolean> = new Subject<boolean>();

  private tokenUrl: string;
  private headers = new Headers({'Content-Type': 'application/json'});
  
  constructor(
    private http: Http,
    private router: Router,
    @Inject(APP_CONFIG) config: AppConfig
  ) {
    this.tokenUrl = `${config.serverUrl}/oauth/token?client_id=${config.clientId}&grant_type=password`;
  }

  login(user) {
    let body = JSON.stringify(user);
    return this.http.post(this.tokenUrl, body, {headers: this.headers}).subscribe(
      response => {
        this.setAccessToken(response.json().access_token);
        this.setLogIn(true);
        this.router.navigate(['/tasks']);
      },
      error => {
        console.log(error.text());
      }
    );
  }

  logout() {
    this.removeAccessToken();
    this.setLogIn(false);
    this.router.navigate(['/login']);
  }

  isLoggedInCheck() {
    if (localStorage.getItem('token')) {
      this.setLogIn(true);
    } else {
      this.setLogIn(false);
    }
  }

  private setAccessToken(token: string) {
    localStorage.setItem('token', token);
  }

  private setLogIn(value: boolean) {
    this.isLoggedIn = value;
    this.isLoggedInChange.next(this.isLoggedIn);
  }

  private removeAccessToken() {
    localStorage.removeItem('token');
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred: ', error);
    return Promise.reject(error.message || error);
  }

  ngOnInit() {
    this.isLoggedInCheck();
  }
}
