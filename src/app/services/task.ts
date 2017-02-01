import { Injectable, Inject }    from '@angular/core';
import { Http, Headers }         from '@angular/http';
import { Observable }            from 'rxjs/Observable';
import { Observer }              from 'rxjs/Observer';
import { Router }                from '@angular/router';
import { APP_CONFIG, AppConfig } from '../app.config';
import { AuthService }           from '../services/auth';
import { Task }                  from '../models/task';

import 'rxjs/add/operator/share';
import 'rxjs/add/operator/map';

@Injectable()
export class TaskService {
  private tasksUrl;
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private http: Http,
    private router: Router,
    private _authService: AuthService,
    @Inject(APP_CONFIG) config: AppConfig
  ) {
    this.tasksUrl = `${config.apiEndpoint}/tasks`;
  }

  getTasks(): Promise<Task[]> {
    return this.http.get(`${this.tasksUrl}?access_token=${localStorage.getItem("token")}`)
      .toPromise()
      .then(res => res.json().tasks as Task[])
      .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred: ', error);
    return Promise.reject(error.message || error);
  }
}
