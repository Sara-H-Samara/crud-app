import { Injectable, computed, signal } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly _accessToken = signal<string | null>(null);

  readonly accessToken = this._accessToken.asReadonly();

  readonly isAuthenticated = computed(() => this._accessToken() !== null);

  setAccessToken(token: string): void {
    this._accessToken.set(token);
  }

  logout(): void {
    this._accessToken.set(null);
  }
}
