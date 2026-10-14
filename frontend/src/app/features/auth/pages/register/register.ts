import { Component, signal } from '@angular/core';
import { FormField, email, form, minLength, required } from '@angular/forms/signals';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormField, RouterLink],
  templateUrl: './register.html',
})
export class Register {
  readonly registerModel = signal({
    name: '',
    email: '',
    password: '',
  });

  readonly registerForm = form(this.registerModel, (path) => {
    required(path.name, {
      message: 'Name is required.',
    });
    required(path.email, {
      message: 'Email is required.',
    });
    email(path.email, {
      message: 'Enter a valid email address.',
    });
    required(path.password, {
      message: 'Password is required.',
    });
    minLength(path.password, 8, {
      message: 'Password must be at least 8 characters.',
    });
  });

  onSubmit(event: Event): void {
    event.preventDefault();

    console.log('Registration form submitted');
    console.log(this.registerModel());
  }
}
