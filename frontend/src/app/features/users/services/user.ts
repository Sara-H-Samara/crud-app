import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8080/users';
  // Writable signals: only the service can modify them.
  private readonly _users = signal<User[]>([]);
  private readonly _selectedUser = signal<User | null>(null);

  // Read-only signals exposed to components.
  readonly users = this._users.asReadonly();
  readonly selectedUser = this._selectedUser.asReadonly();
  readonly count = computed(() => this._users().length);

  // GET: retrieve users from the backend.
  loadUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl).pipe(tap((users) => this._users.set(users)));
  }

  // POST: create a user, or PUT: update an existing user.
  save(value: { name: string; email: string }): Observable<User> {
    const editing = this._selectedUser();

    if (editing) {
      return this.http.put<User>(`${this.apiUrl}/${editing.id}`, value).pipe(
        tap((updatedUser) => {
          this._users.update((users) =>
            users.map((user) => (user.id === updatedUser.id ? updatedUser : user)),
          );

          this._selectedUser.set(null);
        }),
      );
    }

    return this.http.post<User>(this.apiUrl, value).pipe(
      tap((newUser) => {
        this._users.update((users) => [...users, newUser]);
      }),
    );
  }

  // DELETE: remove a user from the backend.
  remove(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => {
        this._users.update((users) => users.filter((user) => user.id !== id));

        if (this._selectedUser()?.id === id) {
          this._selectedUser.set(null);
        }
      }),
    );
  }

  select(user: User): void {
    this._selectedUser.set(user);
  }

  clearSelection(): void {
    this._selectedUser.set(null);
  }
}
