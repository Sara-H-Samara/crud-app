import { Component, effect, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { User } from '../../models/user';
import { UserApiService } from '../../services/user-api.service';

@Component({
  selector: 'app-user-details',
  imports: [RouterLink],
  templateUrl: './user-details.html',
  styleUrl: './user-details.css',
})
export class UserDetails {
  private readonly userApi = inject(UserApiService);

  // filled automatically from /users/:id, thanks to withComponentInputBinding()
  readonly id = input.required<string>();

  protected readonly user = signal<User | null>(null);
  protected readonly errorMessage = signal('');

  constructor() {
    // runs again whenever the id in the URL changes (e.g. /users/3 → /users/7)
    effect(() => {
      const id = Number(this.id());
      this.user.set(null);
      this.errorMessage.set('');

      this.userApi.getUser(id).subscribe({
        next: (user) =>
          user ? this.user.set(user) : this.errorMessage.set('No user with this id.'),
        error: () => this.errorMessage.set('Could not load this user.'),
      });
    });
  }
}
