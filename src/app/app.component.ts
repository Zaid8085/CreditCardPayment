import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'creditCardPayment';
  homeBtn = false;
  constructor(private _router: Router) {}

  public routeToPayment() {
    this.homeBtn = !this.homeBtn;

    if (!this.homeBtn) {
      this._router.navigate(['']);
    } else {
      this._router.navigate(['credit-card-payment']);
    }
  }
}
