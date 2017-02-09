import { Component, OnInit }              from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location }                       from '@angular/common';
import { TaskService }                    from '../../services/task';
import { Task }                           from '../../models/task';
import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  templateUrl: '../../templates/tasks/detail.html'
})

export class TasksDetailComponent implements OnInit {
  public task: Task;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private _taskService: TaskService
  ) {}

  getTask() {
    this.route.params
      .switchMap((params: Params) => this._taskService.getTask(+params['id']))
      .subscribe(task => {
        this.task = task;
      });
  }

  delete(task) {
    if (confirm('Are you sure?')) {
      this._taskService.delete(task.id)
        .then(() => {
          this.router.navigate(['/']);
        });
    };
  }

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    this.getTask();
  }
}
