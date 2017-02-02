import { Component, Inject, forwardRef }      from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService }                        from '../services/auth';

@Component({
  moduleId: module.id,
  templateUrl: '../templates/login.html'
})

export class LoginComponent {
  loginForm: FormGroup;

  constructor(
    @Inject(forwardRef(() => AuthService)) public _authService: AuthService,
    @Inject(FormBuilder) fb: FormBuilder
  ) {
    this.loginForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  login() {
    this._authService.login(this.loginForm.value);
  }

  isValid(field: string, rule: string): boolean {
    if (this.loginForm.controls[field].hasError(rule)
      && this.loginForm.controls[field].touched) {
      return false;
    }
    return true;
  }
}
