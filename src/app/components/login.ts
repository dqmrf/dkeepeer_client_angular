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
    let field_ = this.loginForm.controls[field];
    return (field_.hasError(rule) && field_.touched) ? false : true;
  }

  isValidCompletely(field: string): boolean {
    let field_ = this.loginForm.controls[field];
    return (!field_.valid && field_.touched) ? false : true;
  }
}
