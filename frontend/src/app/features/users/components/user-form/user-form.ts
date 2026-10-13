import { Component, effect, inject, signal, untracked } from '@angular/core';
import { FormField, email, form, required, submit } from '@angular/forms/signals';
import { firstValueFrom } from 'rxjs';

import { UserStore } from '../../services/user-store';

@Component({
  selector: 'app-user-form',
  imports: [FormField],
  templateUrl: './user-form.html',
  styleUrl: './user-form.css',
})
export class UserForm {
  protected readonly userStore = inject(UserStore);

  protected readonly userModel = signal({ name: '', email: '' });

  protected readonly userForm = form(this.userModel, (path) => {
    required(path.name, { message: 'Name is required.' });
    required(path.email, { message: 'Email is required.' });
    email(path.email, { message: 'Enter a valid email address.' });
  });

  protected readonly successMessage = signal('');
  protected readonly errorMessage = signal('');

  constructor() {
    //When a user is selected for editing (or the selection is cleared), fill or empty the form
    effect(() => {
      const selected = this.userStore.selectedUser();
      this.userModel.set({ name: selected?.name ?? '', email: selected?.email ?? '' });
      // clear touched/dirty so a freshly loaded form shows no errors
      untracked(() => this.userForm().reset());
    });
  }

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault(); // stop the browser from reloading the page

    this.successMessage.set('');
    this.errorMessage.set('');
    const editing = this.userStore.selectedUser();

    // submit(): marks every field as touched, and runs the action ONLY if the form is valid
    await submit(this.userForm, async (field) => {
      try {
        await firstValueFrom(this.userStore.save(field().value()));
        this.successMessage.set(editing ? 'User updated.' : 'User created.');
        this.clearForm();
      } catch {
        this.errorMessage.set('Could not save the user. Check your connection and try again.');
      }
      return undefined;
    });
  }

  cancelEdit(): void {
    this.userStore.clearSelection();
    this.clearForm();
    this.successMessage.set('');
    this.errorMessage.set('');
  }

  // empty the values AND reset touched/dirty, so no red errors appear on the empty form
  private clearForm(): void {
    this.userModel.set({ name: '', email: '' });
    this.userForm().reset();
  }
}
