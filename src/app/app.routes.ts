import { NgModule }                    from '@angular/core';
import { Routes, RouterModule }        from '@angular/router';
import { LoginComponent }              from './components/login';
import { RegistrationComponent }       from './components/registration';
import { ConfirmEmailComponent }       from './components/confirm-email';
import { AdminComponent }              from './components/admin';
import { TasksComponent }              from './components/tasks';
import { TasksDetailComponent }        from './components/tasks/detail';
import { TasksDetailInlineComponent }  from './components/tasks/detail-inline';
import { TaskEditComponent }           from './components/tasks/edit';
import { PageNotFoundComponent }       from './components/errors/404';
import { SignedInGuard }               from './guards/signed-in';
import { SignedOutGuard }              from './guards/signed-out';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin',
    pathMatch: 'full'
  },
  {
    path: 'login',
    canActivate: [ SignedInGuard ],
    component: LoginComponent
  },
  {
    path: 'registration',
    canActivate: [ SignedInGuard ],
    component: RegistrationComponent
  },
  {
    path: 'confirm_email',
    canActivate: [ SignedInGuard ],
    component: ConfirmEmailComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [ SignedOutGuard ],
    children: [
      {
        path: '',
        canActivateChild: [ SignedOutGuard ],
        children: [
          {
            path: 'tasks',
            component: TasksComponent
          },
          { 
            path: 'tasks/:id', 
            component: TasksDetailComponent 
          },
          { 
            path: 'tasks/:id/edit', 
            component: TaskEditComponent 
          },
          { 
            path: 'tasks/:id/inline', 
            component: TasksDetailInlineComponent 
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
  providers: [ SignedInGuard, SignedOutGuard ],
  declarations: [ PageNotFoundComponent ]
})

export class AppRoutingModule {}
