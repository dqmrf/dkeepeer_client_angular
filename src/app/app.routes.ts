import { NgModule }              from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';
import { LoginComponent }        from './components/login';
import { RegistrationComponent } from './components/registration';
import { AdminComponent }        from './components/admin';
import { TasksComponent }        from './components/tasks';
import { PageNotFoundComponent } from './components/errors/404';
import { AuthGuard }             from './services/auth-guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
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
    path: 'admin',
    component: AdminComponent,
    canActivate: [ AuthGuard ],
    children: [
      {
        path: '',
        canActivateChild: [ AuthGuard ],
        children: [
          {
            path: 'tasks',
            component: TasksComponent
          },
          {
            path: '',
            component: TasksComponent
          },
        ],
      }
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ],
  declarations: [ PageNotFoundComponent ]
})

export class AppRoutingModule {}
