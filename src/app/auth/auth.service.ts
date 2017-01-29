import { Injectable }    from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router }        from '@angular/router';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {
  private headers = new Headers({'Content-Type': 'application/json'});
  private url = "http://localhost:3000/oauth/token" +
    "?client_id=666487d55b3fdb7cd8a32c2a93cdad8213efe8e46ec8dad62a58c314c42a85c8" +
    "&grant_type=password";

  constructor(
    private http: Http,
    private router: Router
  ) {}

  login(user) {
    let body = JSON.stringify(user);
    return this.http.post(this.url, body, {headers: this.headers}).subscribe(
      response => {
        console.log(response);
        localStorage.setItem('access_token', response.json().access_token);
        // this.router.navigate(['Tasks']);
      },
      error => {
        console.log(error.text());
      }
    );
  }

  logout() {
    localStorage.clear();
    // this.router.navigate(['Login']);
  }

  // private url = "http://localhost:3000/oauth/authorize/" +
  //   "?client_id=666487d55b3fdb7cd8a32c2a93cdad8213efe8e46ec8dad62a58c314c42a85c8" +
  //   "&client_secret=816a014644b7f1b08a5c7a37f39ba17392e05f45a3d200ff4730f0de932fa3c3" +
  //   "&grant_type=client_credentials";
  //   // "&redirect_uri=http://localhost:4200/" +
  //   // "&response_type=code";

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}
