import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormField, email, form, minLength, required, submit } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { authErrorMessage } from '../../auth-error';

@Component({
  selector: 'app-register',
  imports: [FormField, RouterLink],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);

  readonly registerModel = signal({ name: '', email: '', password: '' });

  readonly registerForm = form(this.registerModel, (path) => {
    required(path.name, { message: 'Name is required.' });
    required(path.email, { message: 'Email is required.' });
    email(path.email, { message: 'Enter a valid email address.' });
    required(path.password, { message: 'Password is required.' });
    minLength(path.password, 8, { message: 'Password must be at least 8 characters.' });
  });

  readonly errorMessage = signal('');

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.errorMessage.set('');

    await submit(this.registerForm, async (field) => {
      try {
        // the backend returns a token, so the new user is logged in straight away
        await firstValueFrom(this.auth.register(field().value()));
        await this.router.navigateByUrl('/users');
      } catch (error) {
        this.errorMessage.set(authErrorMessage(error));
      }
      return undefined;
    });
  }
}
