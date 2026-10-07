import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login-box',
  imports: [FormsModule],
  templateUrl: './login-box.html',
  styleUrl: './login-box.css',
})
export class LoginBox {
  loggedInUser = input<string | null>(null); // data DOWN: who is logged in
  loggedIn = output<string>(); // event UP: the username
  loggedOut = output<void>(); // event UP: no data

  // state that ONLY this component needs
  usernameField = signal('');
  passwordField = signal('');
  showPassword = signal(false);

  togglePassword() {
    this.showPassword.update((v) => !v);
  }

  submit() {
    if (this.usernameField().trim() && this.passwordField()) {
      this.loggedIn.emit(this.usernameField().trim());
      this.passwordField.set('');
      this.usernameField.set('');
    }
  }
}
