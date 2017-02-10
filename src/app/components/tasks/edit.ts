import { Component, Inject, forwardRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators }    from '@angular/forms';
import { ActivatedRoute, Params }                from '@angular/router';
import { Location }                              from '@angular/common';
import { IMyOptions, IMyDateModel }              from 'mydatepicker';
import { NotificationsService }                  from 'angular2-notifications';
import { TaskService }                           from '../../services/task';
import { Task }                                  from '../../models/task';

@Component({
  moduleId: module.id,
  templateUrl: '../../templates/tasks/edit.html'
})

export class TaskEditComponent implements OnInit {
  editTaskForm: FormGroup;
  taskId: number;
  private _date: Date = new Date();
  private datePickerOptions: IMyOptions = {
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
    @Inject(forwardRef(() => TaskService)) public _tasksService: TaskService,
    @Inject(FormBuilder) fb: FormBuilder,
    private route: ActivatedRoute,
    private location: Location,
    private _flash: NotificationsService,
  ) {
    this.editTaskForm = fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      priority: ['', Validators.compose([
        Validators.required, 
        Validators.maxLength(6), 
        Validators.pattern("^[0-9]+$")])
      ],
      due_date: ['', Validators.required]
    });
  }

  getTask() {
    this.route.params
      .switchMap((params: Params) => this._tasksService.getTask(+params['id']))
      .subscribe(task => {
        this.taskId = task.id;
        let date = new Date();
        date.setTime(Date.parse(task.due_date));
        this.editTaskForm.setValue({
          title: task.title,
          description: task.description,
          priority: task.priority,
          due_date: {
            date: {
              day: date.getDate(),
              month: date.getMonth() + 1,
              year: date.getFullYear()
            },
            formatted: date.toDateString(),
            jsdate: date,
            epoc: +date.valueOf() / 1000
          },
        });
      });
  }

  update() {
    this._tasksService
      .updateById(this.taskId, this.editTaskForm.value)
      .then(() => {
        this._flash.success('', 'Task successfully updated!');
        this.goBack();
      });
  }

  goBack() {
    this.location.back();
  }

  ngOnInit() {
    this.getTask();
  }

  onDateChanged(event: IMyDateModel) {}

  isValid(field: string, rule: string): boolean {
    let field_ = this.editTaskForm.controls[field];
    return (field_.hasError(rule) && field_.touched) ? false : true;
  }

  isValidCompletely(field: string): boolean {
    let field_ = this.editTaskForm.controls[field];
    return (!field_.valid && field_.touched) ? false : true;
  }
}
