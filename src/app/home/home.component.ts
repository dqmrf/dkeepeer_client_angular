import { Component, OnInit } from '@angular/core';
import { AuthService }       from '../auth/auth.service';
import { User }              from '../user';

@Component({
  moduleId: module.id,
  selector: 'home',
  templateUrl: 'home.component.html'
})

export class HomeComponent implements OnInit {
  user: {};

  constructor(private _authService: AuthService) {
    this.user = {};
  }

  login() {
    this._authService.login(this.user);
  }

  ngOnInit() {}
}
