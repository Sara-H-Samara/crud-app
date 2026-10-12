import { Component, effect, inject } from "@angular/core";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";

import { UserService } from "../../services/user";

@Component({
  selector: "app-user-form",
  imports: [ReactiveFormsModule],
  templateUrl: "./user-form.html",
  styleUrl: "./user-form.css",
})
export class UserForm {
  private readonly fb = inject(FormBuilder);
  protected readonly userService = inject(UserService);

  userForm = this.fb.nonNullable.group({
    name: ["", Validators.required],
    email: ["", [Validators.required, Validators.email]],
  });

  constructor() {
    // when the selected user in the service changes, fill or clear the form
    effect(() => {
      const user = this.userService.selectedUser();
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

    this.userService.save(this.userForm.getRawValue());
    this.userForm.reset();
  }

  cancel(): void {
    this.userService.clearSelection();
  }
}
