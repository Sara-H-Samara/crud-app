import { Component } from "@angular/core";
import { UserForm } from "../user-form/user-form";

@Component({
  imports: [UserForm],
  selector: "app-users-page",
  styleUrl: "./users-page.css",
  templateUrl: "./users-page.html",
})
export class UsersPage {}
