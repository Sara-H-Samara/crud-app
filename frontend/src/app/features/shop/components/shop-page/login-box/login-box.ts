import { Component, inject, signal } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { AuthService } from '../../../../../core/services/auth';

@Component({
  selector: 'app-login-box',
  imports: [FormsModule],
  templateUrl: './login-box.html',
  styleUrl: './login-box.css',
})
export class LoginBox {
  protected readonly auth = inject(AuthService);

  // [(ngModel)] works with signals: typing calls .set(), and .set() updates the input
  usernameField = signal('');
  passwordField = signal('');
  showPassword = signal(false);

  togglePassword() {
    this.showPassword.update((v) => !v);
  }

  submit(form: NgForm) {
    if (form.invalid) {
      form.control.markAllAsTouched();
      return;
    }

    this.auth.login(this.usernameField(), this.passwordField());

    // give explicit values: resetForm() with no argument would write null into the signals
    form.resetForm({ username: '', password: '' });
  }
}
