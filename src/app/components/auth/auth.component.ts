import { Component } from '@angular/core';

import { AuthService } from "@Services/auth.service";

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent {

  public passwordInput: string = "";
  public isAuthenticated: boolean = this.authService.authenticated.getValue();
  public passwordIsInvalid: boolean = false;

  constructor(private authService: AuthService) {}

  public proceed(): void {
    if (this.passwordInput.trim()) {
      !this.authService.checkPassword(this.passwordInput) ? this.passwordIsInvalid = true : this.passwordIsInvalid = false;
    } else {
      console.log('input is empty.');
    }
  }
}
