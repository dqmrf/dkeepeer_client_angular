import { Component, OnDestroy }   from '@angular/core';
import { AuthService }            from '../services/auth';

@Component({
  moduleId: module.id,
  selector: 'navbar',
  templateUrl: '../templates/navbar.html'
})

export class NavbarComponent implements OnDestroy {
  public isLoggedIn: boolean = localStorage.getItem('token') ? true : false;
  private _isLoggedInSubscription;

  constructor(private _authService: AuthService) {
    this._isLoggedInSubscription = _authService.isLoggedIn.subscribe((value) => {
      if (value == undefined) return; 
      this.isLoggedIn = value; 
    });
  }

  logout() {
    this._authService.logout();
  }

  ngOnDestroy() {
    this._isLoggedInSubscription.unsubscribe();
  }
}
