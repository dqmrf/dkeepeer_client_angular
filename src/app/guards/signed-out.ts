import { Injectable }     from '@angular/core';
import { 
  CanActivate, 
  CanActivateChild, 
  Router,  
  ActivatedRouteSnapshot,
  RouterStateSnapshot 
}                         from '@angular/router';
import { AuthService }    from '../services/auth';

@Injectable()
export class SignedOutGuard implements CanActivate, CanActivateChild {
  constructor(
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    let url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): boolean {
    if (localStorage.getItem('token')) {return true;}
    this.router.navigate(['/login']);
    return false;
  }
}
