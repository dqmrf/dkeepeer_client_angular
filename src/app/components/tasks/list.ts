import { Component, OnDestroy } from '@angular/core';
import { TaskService }          from '../../services/task';
import { ByFieldPipe }          from '../../pipes/by-field';
import { Task }                 from '../../models/task';

@Component({
  moduleId: module.id,
  selector: 'tasks-list',
  providers: [ByFieldPipe],
  templateUrl: '../../templates/tasks/list.html'
})

export class TaskListComponent implements OnDestroy {
  tasks: Task[];
  activeTasks: Task[];
  completedTasks: Task[];
  private _tasksSubscription;

  constructor(
    private _taskService: TaskService,
    private byFieldPipe: ByFieldPipe
  ) {
    this._taskService.loadTasks()
      .then(tasks => {
        this.refreshTasks(tasks);
      })
    this._tasksSubscription = _taskService.tasks.subscribe((value) => { 
      if (value == undefined) return;
      this.tasks = value;
      this.refreshPipes(value);
    });
  }

  delete(task) {
    if (confirm('Are you sure?')) {
      this._taskService.delete(task.id)
        .then(data => {
          this.tasks.forEach((t, index) => {
            if (t.id === task.id) { 
              this.tasks.splice(index, 1);
            }
          });
          this.refreshTasks(this.tasks);
        });
    };
  }

  isExists(obj): boolean {
    if (obj && obj !== undefined && obj.length) {
      return true;
    }
    return false;
  }

  refreshTasks(tasks: Task[]) {
    this._taskService.tasks.next(tasks);
    this.refreshPipes(tasks);
  }

  refreshPipes(tasks: Task[]) {
    this.activeTasks = this.byFieldPipe.transform(tasks, 'completed', false);
    this.completedTasks = this.byFieldPipe.transform(tasks, 'completed', false);
  }

  ngOnDestroy() {
    this._tasksSubscription.unsubscribe();
  }
}
