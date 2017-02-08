import { BrowserModule }             from '@angular/platform-browser';
import { NgModule }                  from '@angular/core';
import {
  ReactiveFormsModule, 
  FormsModule,
  FormBuilder, 
  FormGroup, 
  Validators  
}                                    from '@angular/forms';
import { HttpModule }                from '@angular/http';
import { environment }               from '../environments/environment';
import { APP_CONFIG, appConfig }     from './app.config';
import { AppRoutingModule }          from './app.routes';
import { AuthService }               from './services/auth';
import { TaskService }               from './services/task';
import { AppComponent }              from './components/app';
import { LoginComponent }            from './components/login';
import { NavbarComponent }           from './components/navbar';
import { InlineEditComponent }       from './components/inline-edit';
import { RegistrationComponent }     from './components/registration';
import { AdminComponent }            from './components/admin';
import { TasksComponent }            from './components/tasks';
import { TaskListComponent }         from './components/tasks/list';
import { TaskFormComponent }         from './components/tasks/form';
import { TasksDetailComponent }      from './components/tasks/detail';
import { SimpleNotificationsModule } from 'angular2-notifications';
import { MyDatePickerModule }        from 'mydatepicker';
// import { NgbModule }                 from '@ng-bootstrap/ng-bootstrap';
import './rxjs-extensions';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    NavbarComponent,
    AdminComponent,
    TasksComponent,
    TaskListComponent,
    TaskFormComponent,
    TasksDetailComponent,
    InlineEditComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    SimpleNotificationsModule,
    MyDatePickerModule/*,
    NgbModule.forRoot()*/
  ],
  providers: [
    AuthService,
    TaskService,
    FormBuilder,
    Validators,
    { provide: APP_CONFIG, useFactory: appConfig }
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {}
