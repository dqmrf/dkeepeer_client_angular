import { Component, OnInit }      from '@angular/core';
import { Location }               from '@angular/common';
import { ActivatedRoute, Params } from '@angular/router';
import { TaskService }            from '../../services/task';
import { Task }                   from '../../models/task';
import 'rxjs/add/operator/switchMap';

@Component({
  moduleId: module.id,
  templateUrl: '../../templates/tasks/detail.html'
})

export class TasksDetailComponent implements OnInit {
  public task: Task;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private _taskService: TaskService
  ) {}

  getTask() {
    this.route.params
      .switchMap((params: Params) => this._taskService.getTask(+params['id']))
      .subscribe(task => {this.task = task;})
  }

  // save() {
  //   this._taskService.update(this.task)
  //     .then(() => this.goBack());
  // }

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    this.getTask();
  }
}
