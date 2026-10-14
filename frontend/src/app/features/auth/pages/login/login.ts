import { Component, signal } from '@angular/core';
import { FormField, email, form, required } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormField, RouterLink],
  templateUrl: './login.html',
})
export class Login {
  readonly loginModel = signal({
    email: '',
    password: '',
  });

  readonly loginForm = form(this.loginModel, (path) => {
    required(path.email, {
      message: 'Email is required.',
    });
    email(path.email, {
      message: 'Enter a valid email address.',
    });
    required(path.password, {
      message: 'Password is required.',
    });
  });

  onSubmit(event: Event): void {
    event.preventDefault();

    console.log('Login form submitted');
    console.log(this.loginModel());
  }
}
