import { Component, OnDestroy } from '@angular/core';
import { TaskService }          from '../../services/task';
import { Task }                 from '../../models/task';

@Component({
  moduleId: module.id,
  selector: 'tasks-list',
  // pipes: [ByFieldPipe], // => this i will have to understand
  templateUrl: '../../templates/tasks/list.html'
})

export class TaskListComponent implements OnDestroy {
  tasks: Task[];
  private _tasksSubscription;

  constructor(
    private _taskService: TaskService
  ) {
    this._tasksSubscription = _taskService.tasks.subscribe((value) => { 
      if (value == undefined) return;
      this.tasks = value;
    });
    this._taskService.loadTasks();
  }

  ngOnDestroy() {
    this._tasksSubscription.unsubscribe();
  }
}
