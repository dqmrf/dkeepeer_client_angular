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
  selectedTasks: Task[] = [];
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

  updateCheckedOptions(task, $event) {
    let tasks = this.selectedTasks;
    if ($event.target.checked) {
      tasks.push(task.id);
    } else {
      tasks.forEach((t, index) => {
        if (t === task.id) { 
          tasks.splice(index, 1);
          return;
        }
      });
    }
  }

  update(task: Task) {
    this._taskService.update(task)
      .then(() => this.refreshTasks(this.tasks));
  }

  batchDestroy(ids: Array<number>) {
    this._taskService.batchDestroy(ids)
      .then(ids => {
        ids.forEach((id, i) => {
          this.tasks.forEach((t, index) => {
            if (t.id === id) {
              this.tasks.splice(index, 1);
              return;
            }
          });
        }); 
        this.refreshTasks(this.tasks);
        this.selectedTasks = [];
      });
  }

  delete(task: Task) {
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
    this.completedTasks = this.byFieldPipe.transform(tasks, 'completed', true);
  }

  ngOnDestroy() {
    this._tasksSubscription.unsubscribe();
  }
}
