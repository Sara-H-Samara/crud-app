import { inject } from '@angular/core';
import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.accessToken();

  // no token, or not our backend → send the request unchanged
  if (!token || !req.url.startsWith('http://localhost:8080/')) {
    return next(req);
  }

  // add "Authorization: Bearer <token>"
  const authenticatedRequest = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });

  return next(authenticatedRequest).pipe(
    catchError((error: HttpErrorResponse) => {
      // the token was rejected (expired / invalid) → log out and go to /login
      if (error.status === 401) {
        authService.logout();
      }
      return throwError(() => error);
    }),
  );
};
