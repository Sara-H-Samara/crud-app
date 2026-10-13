import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { User } from '../models/user';
import { UserApiService, UserPayload } from './user-api.service';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
  private readonly userApi = inject(UserApiService);

  // Private writable state.
  private readonly _users = signal<User[]>([]);
  private readonly _selectedUser = signal<User | null>(null);

  // Public read-only state.
  readonly users = this._users.asReadonly();
  readonly selectedUser = this._selectedUser.asReadonly();
  readonly count = computed(() => this._users().length);

  // Load users from the backend, then update the state.
  loadUsers(): Observable<User[]> {
    return this.userApi.getUsers().pipe(tap((users) => this._users.set(users)));
  }

  // Create a user or update the selected user.
  save(value: UserPayload): Observable<User> {
    const editing = this._selectedUser();

    if (editing) {
      return this.userApi.updateUser(editing.id, value).pipe(
        tap((updatedUser) => {
          this._users.update((users) =>
            users.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
          );

          this._selectedUser.set(null);
        }),
      );
    }

    return this.userApi.createUser(value).pipe(
      tap((newUser) => {
        this._users.update((users) => [...users, newUser]);
      }),
    );
  }

  // Delete a user, then update the state.
  remove(id: number): Observable<void> {
    return this.userApi.deleteUser(id).pipe(
      tap(() => {
        this._users.update((users) => users.filter((user) => user.id !== id));

        if (this._selectedUser()?.id === id) {
          this._selectedUser.set(null);
        }
      }),
    );
  }

  // Select a user for editing.
  select(user: User): void {
    this._selectedUser.set(user);
  }

  // Cancel editing.
  clearSelection(): void {
    this._selectedUser.set(null);
  }
}
