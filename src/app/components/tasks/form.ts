import { Component, Inject, forwardRef }      from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TaskService }                        from '../../services/task';
import { Task }                               from '../../models/task';
import 'rxjs/add/operator/toPromise';

@Component({
  moduleId: module.id,
  selector: 'tasks-form',
  templateUrl: '../../templates/tasks/form.html'
})

export class TaskFormComponent {
  createTaskForm: FormGroup;
  tasks: Task[];

  constructor(
    @Inject(forwardRef(() => TaskService)) public _taskService: TaskService,
    @Inject(FormBuilder) fb: FormBuilder
  ) {
    this.createTaskForm = fb.group({
      title: ['', Validators.required]
    });
  }

  createTask() {
    this._taskService.create(this.createTaskForm.value);
    this.createTaskForm.reset();
  }

  isValid(field: string, rule: string): boolean {
    let field_ = this.createTaskForm.controls[field];
    return (field_.hasError(rule) && field_.touched) ? false : true;
  }

  isValidCompletely(field: string): boolean {
    let field_ = this.createTaskForm.controls[field];
    return (!field_.valid && field_.touched) ? false : true;
  }
}
