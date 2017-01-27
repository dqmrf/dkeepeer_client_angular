import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router }        from '@angular/router';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private url = "http://localhost:3000/oauth/authorize/?client_id=666487d55b3fdb7cd8a32c2a93cdad8213efe8e46ec8dad62a58c314c42a85c8&redirect_uri=http://localhost:4200/&response_type=code";

  constructor(
    private http: Http,
    private router: Router
  ) {}

  login(user) {
    let body = JSON.stringify(user);
    return this.http.post(this.url, body, {headers: this.headers}).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error.text());
      }
    );
  }

  // login() {
  //   this.http.get(this.url, { headers: this.headers }).subscribe(
  //     response => {
  //       // localStorage.setItem('access_token', response.json().code);
  //       console.log(response.json());
  //       // this.router.navigate(['Tasks']);
  //     },
  //     error => {
  //       alert(error.text());
  //     }
  //   );
  // }

  // login(): Promise<Object> {
  //   return this.http.get(this.url)
  //     .toPromise()
  //     .then(res => res.json() as Object)
  //     .catch(this.handleError);
  // }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}