import { NgModule }              from '@angular/core';
import { 
  Routes, 
  RouterModule
}                                from '@angular/router';
import { LoginComponent }        from './components/login';
import { RegistrationComponent } from './components/registration';
import { TasksComponent }        from './components/tasks';
import { AuthGuard }             from './services/auth-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'registration',
    component: RegistrationComponent
  },
  {
    path: 'tasks',
    component: TasksComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}
