import { Injectable, computed, signal } from "@angular/core";

import { User } from "../models/user";

/**
 * Holds the users in memory (no backend yet — that's Day 18).
 *
 * `providedIn: 'root'` = ONE instance for the whole app.
 * Every component that injects UserService sees the same users.
 */
@Injectable({
  providedIn: "root",
})
export class UserService {
  private nextId = 3;

  // private writable signals: only the service can change them
  private readonly _users = signal<User[]>([
    { id: 1, name: "Sara", email: "sara@example.com" },
    { id: 2, name: "Omar", email: "omar@example.com" },
  ]);
  private readonly _selectedUser = signal<User | null>(null);

  // public read-only views for components
  readonly users = this._users.asReadonly();
  readonly selectedUser = this._selectedUser.asReadonly();
  readonly count = computed(() => this._users().length);

  /** Adds a new user, or updates the selected one if we are editing. */
  save(value: { name: string; email: string }): void {
    const editing = this._selectedUser();

    if (editing) {
      this._users.update((users) =>
        users.map((user) =>
          user.id === editing.id ? { ...user, ...value } : user,
        ),
      );
    } else {
      this._users.update((users) => [
        ...users,
        { id: this.nextId++, ...value },
      ]);
    }

    this._selectedUser.set(null);
  }

  remove(id: number): void {
    this._users.update((users) => users.filter((user) => user.id !== id));
    if (this._selectedUser()?.id === id) {
      this._selectedUser.set(null);
    }
  }

  select(user: User): void {
    this._selectedUser.set(user);
  }

  clearSelection(): void {
    this._selectedUser.set(null);
  }
}
