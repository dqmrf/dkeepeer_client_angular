import { BrowserModule }           from '@angular/platform-browser';
import { NgModule }                from '@angular/core';
import { 
  APP_CONFIG, 
  CONFIG_PRODUCTION, 
  CONFIG_DEVELOPMENT 
}                                  from './app.config';
import { environment }             from '../environments/environment';
import { FormsModule }             from '@angular/forms';
import { HttpModule }              from '@angular/http';
import { AppRoutingModule }        from './app.routes';
import { AuthService }             from './services/auth';
import { TaskService }             from './services/task';
import { AuthGuard }               from './services/auth-guard';
import { AppComponent }            from './components/app';
import { LoginComponent }          from './components/login';
import { NavbarComponent }         from './components/navbar';
import { RegistrationComponent }   from './components/registration';
import { TasksComponent }          from './components/tasks';
import { TaskListComponent }       from './components/tasks/list';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    NavbarComponent,
    TasksComponent,
    TaskListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule
  ],
  providers: [
    AuthService,
    TaskService,
    AuthGuard,
    { provide: APP_CONFIG, 
      useValue: environment.production 
                ? CONFIG_PRODUCTION 
                : CONFIG_DEVELOPMENT 
    }
  ],
  bootstrap: [ AppComponent ]
})

export class AppModule {}
