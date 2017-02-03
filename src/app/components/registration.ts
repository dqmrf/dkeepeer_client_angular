import { Component, Inject, forwardRef }      from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService }                        from '../services/auth';

@Component({
  moduleId: module.id,
  templateUrl: '../templates/registration.html'
})

export class RegistrationComponent {
  registerForm: FormGroup;

  constructor(
    @Inject(forwardRef(() => AuthService)) public _authService: AuthService,
    @Inject(FormBuilder) fb: FormBuilder
  ) {
    this.registerForm = fb.group({
      email: ['', Validators.required],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
      password_confirmation: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    }, {validator: this.matchingPasswords('password', 'password_confirmation')});
  }

  registration() {
    // this._authService.registration(this.registerForm.value);
  }

  matchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
    return (group: FormGroup) => {
      let passwordInput = group.controls[passwordKey];
      let passwordConfirmationInput = group.controls[passwordConfirmationKey];
      if (passwordInput.value != passwordConfirmationInput.value) {
        return passwordConfirmationInput.setErrors({notEquivalent: true});
      }
    };
  }

  isValid(field: string, rule: string): boolean {
    let field_ = this.registerForm.controls[field];
    return (field_.hasError(rule) && field_.touched) ? false : true;
  }

  isValidCompletely(field: string): boolean {
    let field_ = this.registerForm.controls[field];
    return (!field_.valid && field_.touched) ? false : true;
  }
}