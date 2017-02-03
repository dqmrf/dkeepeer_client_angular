import { Injectable }  from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private _authService: AuthService
  ) {}

  canActivate() {
    if (localStorage.getItem('token')) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
