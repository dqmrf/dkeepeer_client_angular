import { Component,  Inject, forwardRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Location }                       from '@angular/common';
import { AuthService }                    from '../services/auth';

@Component({
  templateUrl: '../templates/confirm-email.html'
})

export class ConfirmEmailComponent {
  loading: boolean = true;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    @Inject(forwardRef(() => AuthService)) public _authService: AuthService,
  ) {
    this.checkConfirmationToken();
  }

  checkConfirmationToken() {
    this.route.queryParams
      .subscribe((params: Params) => {
        let token: string = params['confirmation_token'];
        if (params && token) {
          this._authService.checkConfirmationToken(token)
            .then(res => {
              this.loading = false;
            });
        } else {
          this.router.navigate(['/login']);
        }
      });
  }
}
