import { Component, effect, inject, input, output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { User } from '../../models/user';
import { UserService } from '../../services/user';

@Component({
  selector: 'app-user-form',
  imports: [ReactiveFormsModule],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm {
  private readonly fb = inject(FormBuilder);
  private readonly userService = inject(UserService);

  user = input<User | null>(null);
  userSaved = output<void>();
  cancelled = output<void>();

  userForm = this.fb.nonNullable.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor() {
    effect(() => {
      const user = this.user();
      if (user) {
        this.userForm.setValue({ name: user.name, email: user.email });
      } else {
        this.userForm.reset();
      }
    });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      return;
    }

    const value = this.userForm.getRawValue();
    const editing = this.user();

    const request = editing
      ? this.userService.updateUser(editing.id!, value)
      : this.userService.createUser(value);

    request.subscribe({
      next: () => {
        this.userForm.reset();
        this.userSaved.emit();
      },
      error: (error) => console.error('Failed to save user:', error),
    });
  }
}
