import { HttpErrorResponse } from '@angular/common/http';

export function authErrorMessage(error: unknown): string {
  if (error instanceof HttpErrorResponse) {
    if (error.status === 0) {
      return 'Cannot reach the server. Check that the backend is running.';
    }
    // Spring sends { message: "..." } because of server.error.include-message=always
    if (typeof error.error?.message === 'string' && error.error.message) {
      return error.error.message;
    }
  }
  return 'Something went wrong. Please try again.';
}
