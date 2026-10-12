import { Component, inject } from "@angular/core";

import { UserService } from "../../services/user";
import { UserForm } from "../user-form/user-form";
import { UserList } from "../user-list/user-list";

@Component({
  imports: [UserForm, UserList],
  selector: "app-users-page",
  styleUrl: "./users-page.css",
  templateUrl: "./users-page.html",
})
export class UsersPage {
  // DI: Angular gives us the shared UserService instance
  protected readonly userService = inject(UserService);
}
