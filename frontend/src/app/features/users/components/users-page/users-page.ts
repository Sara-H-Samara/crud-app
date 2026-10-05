import { Component, OnInit, inject, signal } from '@angular/core';

import { User } from '../../models/user';
import { UserService } from '../../services/user';
import { UserForm } from '../user-form/user-form';
import { UserList } from '../user-list/user-list';

@Component({
  imports: [UserForm, UserList],
  selector: 'app-users-page',
  styleUrl: './users-page.css',
  templateUrl: './users-page.html',
})
export class UsersPage implements OnInit {
  private readonly userService = inject(UserService);

  users = signal<User[]>([]);

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.userService.getUsers().subscribe({
      next: (users) => this.users.set(users),
      error: (error) => console.error('Failed to load users:', error),
    });
  }

  onDelete(id: number): void {
    this.userService.deleteUser(id).subscribe({
      next: () => this.loadUsers(),
      error: (error) => console.error('Failed to delete user:', error),
    });
  }

  selectedUser = signal<User | null>(null);

  onEdit(user: User): void {
    this.selectedUser.set(user);
  }

  onSaved(): void {
    this.selectedUser.set(null);
    this.loadUsers();
  }

  onCancel(): void {
    this.selectedUser.set(null);
  }
}
