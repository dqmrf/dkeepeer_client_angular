import { 
  Component, 
  Inject, 
  OnDestroy, 
  forwardRef,
  OnInit }             from '@angular/core';
import { 
  FormBuilder, 
  FormGroup,
  Validators }         from '@angular/forms';
import { TaskService } from '../../services/task';
import { Task }        from '../../models/task';
import { 
  IMyOptions, 
  IMyDateModel }       from 'mydatepicker';

@Component({
  moduleId: module.id,
  selector: 'tasks-form',
  templateUrl: '../../templates/tasks/form.html'
})

export class TaskFormComponent implements OnDestroy {
  createTaskForm: FormGroup;
  tasks: Task[] = [];
  private _tasksSubscription;
  private _date: Date = new Date();
  private myDatePickerOptions: IMyOptions = {
    inline: true,
    width: "100%",
    dateFormat: 'dd-mm-yyyy',
    disableUntil: {
      year: this._date.getFullYear(), 
      month: this._date.getMonth() + 1,
      day: this._date.getDate() - 1 
    }
  };

  constructor(
    @Inject(FormBuilder) fb: FormBuilder,
    @Inject(forwardRef(() => TaskService)) public _taskService: TaskService,
  ) {
    this.createTaskForm = fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.compose([
        Validators.required, 
        Validators.maxLength(6), 
        Validators.pattern("^[0-9]+$")])
      ],
      due_date: ['', Validators.required],
    });
    this._tasksSubscription = _taskService.tasks.subscribe((value) => { 
      if (value == undefined) return;
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

  onDateChanged(event: IMyDateModel) {}
}
