import { Component, OnDestroy } from '@angular/core';
import { TaskService }          from '../../services/task';
import { FilterByFieldPipe }    from '../../pipes/filter-by-field';
import { SortByFieldPipe }      from '../../pipes/sort-by-field';
import { Task }                 from '../../models/task';

@Component({
  moduleId: module.id,
  selector: 'tasks-list',
  providers: [FilterByFieldPipe, SortByFieldPipe],
  templateUrl: '../../templates/tasks/list.html'
})

export class TaskListComponent implements OnDestroy {
  tasks: Task[] = [];
  activeTasks: Task[];
  completedTasks: Task[];
  selectedTasks: Array<number> = [];
  sorted: boolean = false;
  private _tasksSubscription;

  constructor(
    private _taskService: TaskService,
    private filterByField: FilterByFieldPipe,
    private sortByField: SortByFieldPipe
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

  update(task: Task) {
    this._taskService.update(task)
      .then(() => this.refreshTasks(this.tasks));
  }

  batchDestroy(ids: Array<number>) {
    if (confirm('Are you sure?')) {
      this._taskService.batchDestroy(ids)
        .then(ids => {
          if (!ids) return false;
          for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i]['marked'] === true) {
              this.tasks.splice(i, 1);
              i--;
            }
          }
          this.refreshTasks(this.tasks);
          this.selectedTasks = [];
        });
    }
  }

  delete(task) {
    let self = this;

    if (confirm('Are you sure?')) {
      this._taskService.delete(task.id)
        .then(data => {
          this.tasks.forEach((t, index) => {
            if (t.id === task.id) {
              this.tasks.splice(index, 1);
              checkIfMarked();
            }
          });
          this.refreshTasks(this.tasks);
        });
    };

    function checkIfMarked() {
      if (task.marked === true) {
        self.selectedTasks.forEach((selectedTask, j) => {
          if (selectedTask == task.id) {
            self.selectedTasks.splice(j, 1);
          }
        })
      }
    }
  }

  updateCheckedOptions(task, $event) {
    let tasks = this.selectedTasks;
    if ($event.target.checked) {
      tasks.push(task.id);
      task.marked = true;
    } else {
      tasks.forEach((t, index) => {
        if (t === task.id) { 
          tasks.splice(index, 1);
          task.marked = false;
          return;
        }
      });
    }
  }

  checkAll() {
    this.selectedTasks = [];
    this.tasks.forEach((task, i) => {
      this.selectedTasks.push(task.id);
      task.marked = true;
    });
  }

  uncheckAll() {
    this.selectedTasks = [];
    this.tasks.forEach((task, i) => {
      if (task.marked === true) {
        task.marked = false
      }
    });
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

  sortBy(field: string) {
    let desc = this.sorted === true ? true : false;
    this.tasks = this.sortByField.transform(this.tasks, field, desc);
    this.refreshTasks(this.tasks);
  }

  refreshPipes(tasks: Task[]) {
    this.activeTasks = this.filterByField.transform(tasks, 'completed', false);
    this.completedTasks = this.filterByField.transform(tasks, 'completed', true);
  }

  ngOnDestroy() {
    this._tasksSubscription.unsubscribe();
  }
}
