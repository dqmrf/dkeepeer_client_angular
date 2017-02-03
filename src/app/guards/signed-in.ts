import { Injectable }          from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable()
export class SignedInGuard implements CanActivate {
  constructor(private router: Router) {}
  
  canActivate(): boolean {
    if (!localStorage.getItem('token')) {return true}
    this.router.navigate(['/admin']);
    return false;
  }
}
