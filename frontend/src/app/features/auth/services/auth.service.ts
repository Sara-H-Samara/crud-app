import { Injectable, computed, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';

import { AuthResponse, LoginRequest, RegisterRequest } from '../models/auth';

const STORAGE_KEY = 'auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);
  private readonly apiUrl = 'http://localhost:8080/api/auth';

  // the whole session (token + user). Starts from localStorage, so a page reload keeps you logged in.
  private readonly _session = signal<AuthResponse | null>(this.loadSession());

  readonly accessToken = computed(() => this._session()?.token ?? null);
  readonly currentUser = computed(() => {
    const session = this._session();
    return session ? { name: session.name, email: session.email } : null;
  });
  readonly isAuthenticated = computed(() => this._session() !== null);

  login(body: LoginRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/login`, body)
      .pipe(tap((response) => this.saveSession(response)));
  }

  register(body: RegisterRequest): Observable<AuthResponse> {
    return this.http
      .post<AuthResponse>(`${this.apiUrl}/register`, body)
      .pipe(tap((response) => this.saveSession(response)));
  }

  logout(): void {
    localStorage.removeItem(STORAGE_KEY);
    this._session.set(null);
    this.router.navigate(['/login']);
  }

  private saveSession(session: AuthResponse): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
    this._session.set(session);
  }

  private loadSession(): AuthResponse | null {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        return null;
      }
      const session = JSON.parse(raw) as AuthResponse;
      // expired token → treat as logged out
      if (Date.now() >= session.expiresAt) {
        localStorage.removeItem(STORAGE_KEY);
        return null;
      }
      return session;
    } catch {
      return null;
    }
  }
}
