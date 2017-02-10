import { Injectable, Inject }    from '@angular/core';
import { Http, Headers }         from '@angular/http';
import { NotificationsService }  from 'angular2-notifications';
import { APP_CONFIG, AppConfig } from '../app.config';
import { Task }                  from '../models/task';
import { Subject }               from 'rxjs/Subject';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TaskService {
  public tasks: Subject<Task[]>;

  private _tasks: Task[];
  private tasksUrl: string;
  private headers = new Headers({'Content-Type': 'application/json'});

  constructor(
    private http: Http,
    private _flash: NotificationsService,
    @Inject(APP_CONFIG) config: AppConfig
  ) {
    this.tasksUrl = `${config.apiEndpoint}/tasks`;
    this.tasks = new Subject<Task[]>();
  }

  loadTasks(): Promise<Task[]> {
    const url = `${this.tasksUrl}?access_token=${localStorage.getItem('token')}`;
    return this.http.get(url)
      .toPromise()
      .then(res => res.json().tasks as Task[])
      .catch(error => this.handleError(error, 'Could not load tasks!'));
  }

  getTask(id: number): Promise<Task> {
    const url = `${this.tasksUrl}/${id}?access_token=${localStorage.getItem('token')}`;
    return this.http.get(url)
      .toPromise()
      .then(res => res.json() as Task)
      .catch(error => this.handleError(error, 'Could not load task!'));
  }

  create(task): Promise<Task> {
    task['due_date'] = task['due_date']['formatted'];
    let body = JSON.stringify({task: task});
    const url = `${this.tasksUrl}?access_token=${localStorage.getItem('token')}`;
    return this.http.post(url, body, { headers: this.headers })
      .toPromise()
      .then(res => res.json() as Task)
      .catch(error => {
        this.handleError(error, 'Could not create task!')
      });
  }

  update(task) {
    const url = `${this.tasksUrl}/${task.id}?access_token=${localStorage.getItem('token')}`;
    if (task['due_date'] && task['due_date']['formatted']) {
      task['due_date'] = task['due_date']['formatted'];
    }
    return this.http.put(url, JSON.stringify(task), { headers: this.headers })
      .toPromise()
      .then(res => res.json() as Task)
      .catch(error => {
        this.handleError(error, 'Could not update task!')
      });
  }

  updateById(id: number, task) {
    task.id = id;
    return this.update(task);
  }

  delete(id: number) {
    const url = `${this.tasksUrl}/${id}?access_token=${localStorage.getItem('token')}`;
    return this.http.delete(url)
      .toPromise()
      .then(res => res.json() as Task)
      .catch(error => {
        this.handleError(error, 'Could not delete task!')
      });
  }

  batchDestroy(ids: Array<number>) {
    let body = JSON.stringify({tasks: ids});
    const url = `${this.tasksUrl}/batch_destroy?access_token=${localStorage.getItem('token')}`;
    return this.http.delete(url, { body: body, headers: this.headers })
      .toPromise()
      .then(res => res.json().ids)
      .catch(error => {
        this.handleError(error, 'Could not delete tasks!')
      });
  }

  private handleError(error: any, flash: any = null): Promise<any> {
    console.error(error);
    flash ? this._flash.error('', flash) : null;
    return Promise.reject(error.message || error);
  }
}
