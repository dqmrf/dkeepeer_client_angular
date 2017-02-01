import { Component, OnInit }  from '@angular/core';
import { Router }             from '@angular/router';
import { Observable }         from 'rxjs/Observable';
import { TaskService }        from '../../services/task';
import { Task }               from '../../models/task';

@Component({
  selector: 'task-list',
  // pipes: [ByFieldPipe], // => this i will have to understand
  moduleId: module.id,
  templateUrl: '../../templates/tasks/list.html'
})

export class TaskListComponent implements OnInit {
  tasks: Task[];

  constructor(
    private router: Router,
    private _taskService: TaskService
  ) {}

  getTasks(): void {
    this._taskService.getTasks().then(tasks => {
      this.tasks = tasks
    });
  }

  ngOnInit(): void {
    this.getTasks();
  }
}
