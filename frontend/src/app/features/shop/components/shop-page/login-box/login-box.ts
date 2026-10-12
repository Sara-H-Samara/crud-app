import { Component, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { AuthService } from "../../../../../core/services/auth";

@Component({
  selector: "app-login-box",
  imports: [FormsModule],
  templateUrl: "./login-box.html",
  styleUrl: "./login-box.css",
})
export class LoginBox {
  // Before: input `loggedInUser` + outputs `loggedIn` / `loggedOut`.
  // Now: who is logged in is app-wide state, so it lives in AuthService.
  protected readonly auth = inject(AuthService);

  // state that ONLY this component needs stays here
  usernameField = signal("");
  passwordField = signal("");
  showPassword = signal(false);

  togglePassword() {
    this.showPassword.update((v) => !v);
  }

  submit() {
    if (this.auth.login(this.usernameField(), this.passwordField())) {
      this.passwordField.set("");
      this.usernameField.set("");
    }
  }
}
