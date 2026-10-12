import { Injectable, computed, signal } from "@angular/core";

/**
 * Holds who is logged in. One instance for the whole app.
 * Day 19 will replace this fake login with a real one (JWT).
 */
@Injectable({
  providedIn: "root",
})
export class AuthService {
  private readonly _username = signal<string | null>(null);

  readonly username = this._username.asReadonly();
  readonly isLoggedIn = computed(() => this._username() !== null);

  login(username: string, password: string): boolean {
    const name = username.trim();
    if (!name || !password) {
      return false;
    }
    this._username.set(name);
    return true;
  }

  logout(): void {
    this._username.set(null);
  }
}
