import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormField, email, form, required, submit } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';

import { AuthService } from '../../services/auth.service';
import { authErrorMessage } from '../../auth-error';

@Component({
  selector: 'app-login',
  imports: [FormField, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);

  readonly loginModel = signal({ email: '', password: '' });

  readonly loginForm = form(this.loginModel, (path) => {
    required(path.email, { message: 'Email is required.' });
    email(path.email, { message: 'Enter a valid email address.' });
    required(path.password, { message: 'Password is required.' });
  });

  readonly errorMessage = signal('');

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();
    this.errorMessage.set('');

    await submit(this.loginForm, async (field) => {
      try {
        await firstValueFrom(this.auth.login(field().value()));
        // go back to the page the guard sent us from, or to /users
        const returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') ?? '/users';
        await this.router.navigateByUrl(returnUrl);
      } catch (error) {
        this.errorMessage.set(authErrorMessage(error));
      }
      return undefined;
    });
  }
}
