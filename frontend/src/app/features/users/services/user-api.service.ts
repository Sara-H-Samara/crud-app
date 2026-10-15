import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { User } from '../models/user';

export type UserPayload = Pick<User, 'name' | 'email'>;

@Injectable({
  providedIn: 'root',
})
export class UserApiService {
  private readonly http = inject(HttpClient);

  private readonly apiUrl = 'http://localhost:8080/api/users';

  // GET: retrieve all users.
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl);
  }

  // POST: create a new user.
  createUser(value: UserPayload): Observable<User> {
    return this.http.post<User>(this.apiUrl, value);
  }

  // PUT: update an existing user.
  updateUser(id: number, value: UserPayload): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/${id}`, value);
  }

  // DELETE: remove a user.
  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // GET: retrieve one user by id.
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }
}
