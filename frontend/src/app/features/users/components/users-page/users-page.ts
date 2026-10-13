import { Component, inject, OnInit, signal } from '@angular/core';

import { UserForm } from '../user-form/user-form';
import { UserList } from '../user-list/user-list';
import { UserStore } from '../../services/user-store';

@Component({
  imports: [UserForm, UserList],
  selector: 'app-users-page',
  styleUrl: './users-page.css',
  templateUrl: './users-page.html',
})
export class UsersPage implements OnInit {
  protected readonly userService = inject(UserStore);

  protected readonly loading = signal(false);
  protected readonly errorMessage = signal('');

  ngOnInit(): void {
    this.loading.set(true);
    this.errorMessage.set('');

    this.userService.loadUsers().subscribe({
      next: () => {
        this.loading.set(false);
      },
      error: (error) => {
        this.loading.set(false);
        this.errorMessage.set('Failed to load users.');
        console.error('Load users error:', error);
      },
    });
  }
  onDelete(id: number): void {
    this.errorMessage.set('');
    this.userService.remove(id).subscribe({
      error: (error) => {
        this.errorMessage.set('Could not delete the user. Try again.');
        console.error('Delete user error:', error);
      },
    });
  }
}
