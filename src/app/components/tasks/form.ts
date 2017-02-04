import { 
  Component, 
  Inject, 
  OnDestroy, 
  forwardRef }         from '@angular/core';
import { 
  FormBuilder, 
  FormGroup,
  Validators }         from '@angular/forms';
import { TaskService } from '../../services/task';
import { Task }        from '../../models/task';
import 'rxjs/add/operator/toPromise';

@Component({
  moduleId: module.id,
  selector: 'tasks-form',
  templateUrl: '../../templates/tasks/form.html'
})

export class TaskFormComponent implements OnDestroy {
  createTaskForm: FormGroup;
  tasks: Task[];

  private _tasksSubscription;

  constructor(
    @Inject(forwardRef(() => TaskService)) public _taskService: TaskService,
    @Inject(FormBuilder) fb: FormBuilder
  ) {
    this.createTaskForm = fb.group({
      title: ['', Validators.required]
    });
    this._tasksSubscription = _taskService.tasks.subscribe((value) => { 
      this.tasks = value;
    });
  }

  createTask() {
    this._taskService.create(this.createTaskForm.value)
    .then(data => { 
      this.tasks.unshift(data);
      this._taskService.tasks.next(this.tasks);
      this.createTaskForm.reset();
    });
  }

  isValid(field: string, rule: string): boolean {
    let field_ = this.createTaskForm.controls[field];
    return (field_.hasError(rule) && field_.touched) ? false : true;
  }

  isValidCompletely(field: string): boolean {
    let field_ = this.createTaskForm.controls[field];
    return (!field_.valid && field_.touched) ? false : true;
  }

  ngOnDestroy() {
    this._tasksSubscription.unsubscribe();
  }
}
