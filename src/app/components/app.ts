import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: '../templates/app.html'
})

export class AppComponent {
  public notificationsOptions = {
    timeOut: 5000,
    lastOnBottom: true,
    clickToClose: true,
    maxLength: 0,
    maxStack: 6,
    showProgressBar: true,
    pauseOnHover: true,
    preventDuplicates: false,
    preventLastDuplicates: 'visible',
    rtl: false,
    animate: 'fromRight',
    position: ['right', 'bottom']
  };
}
