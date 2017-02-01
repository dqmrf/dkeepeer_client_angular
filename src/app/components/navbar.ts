import { Component, OnDestroy }   from '@angular/core';
import { AuthService } from '../services/auth';

@Component({
  moduleId: module.id,
  selector: 'navbar',
  templateUrl: '../templates/navbar.html'
})

export class NavbarComponent implements OnDestroy {
  public isLoggedIn: boolean = this._authService.isLoggedIn;
  private _subscription;

  constructor(private _authService: AuthService) {
    this._subscription = _authService.isLoggedInChange.subscribe((value) => { 
      this.isLoggedIn = value; 
    });
  }

  logout() {
    this._authService.logout();
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
