import { Component }   from '@angular/core';
import { AuthService } from '../services/auth';

@Component({
  selector: 'navbar',
  moduleId: module.id,
  templateUrl: '../templates/navbar.html'
})

export class NavbarComponent {
  constructor(private _authService: AuthService) {}

  logout() {
    this._authService.logout();
  }
}
