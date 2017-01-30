import { Component, Directive }  from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Task }       from '../../models/task';

@Component({
  selector: 'task-list',
  // pipes: [ByFieldPipe], // => this i will have to understand
  moduleId: module.id,
  templateUrl: '../../templates/tasks/list.html',
})

export class TaskListComponent {
  tasks: Observable<Task[]>;
}
