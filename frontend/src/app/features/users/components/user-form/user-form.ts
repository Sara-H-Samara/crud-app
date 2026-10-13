import { Component, effect, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { UserService } from '../../services/user';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm {
  private readonly fb = inject(FormBuilder);
  protected readonly userService = inject(UserService);

  protected readonly loading = signal(false);
  protected readonly errorMessage = signal('');
  protected readonly successMessage = signal('');

  userForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor() {
    effect(() => {
      const user = this.userService.selectedUser();

      if (user) {
        this.userForm.setValue({
          name: user.name,
          email: user.email,
        });
      } else {
        this.userForm.reset();
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid || this.loading()) {
      this.userForm.markAllAsTouched();
      return;
    }

    this.loading.set(true);
    this.errorMessage.set('');
    this.successMessage.set('');

    this.userService.save(this.userForm.getRawValue()).subscribe({
      next: () => {
        this.loading.set(false);
        this.successMessage.set('User saved successfully.');
        this.userService.clearSelection();
      },
      error: (error) => {
        this.loading.set(false);
        this.errorMessage.set('Failed to save user. Please try again.');
        console.error('Save user error:', error);
      },
    });
  }

  cancel(): void {
    this.userService.clearSelection();
    this.errorMessage.set('');
    this.successMessage.set('');
  }
}
