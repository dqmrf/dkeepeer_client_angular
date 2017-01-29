import { Component, OnInit } from '@angular/core';
import { AuthService }       from '../services/auth.service';

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: '../templates/login.component.html'
})

export class LoginComponent implements OnInit {
  user: {};

  constructor(private _authService: AuthService) {
    this.user = {};
  }

  login() {
    this._authService.login(this.user);
  }

  ngOnInit() {}
}
