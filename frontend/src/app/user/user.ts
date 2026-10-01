import { Component, OnInit, ChangeDetectorRef } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { User } from "../models/user";
import { UserService } from "../services/user.service";

@Component({
  selector: "app-user",
  imports: [FormsModule],
  templateUrl: "./user.html",
  styleUrl: "./user.css",
})
export class UserComponent implements OnInit {
  users: User[] = [];

  // Add User
  newName = "";
  newEmail = "";

  // Edit User
  editingUser: User | null = null;
  editName = "";
  editEmail = "";

  constructor(
    private userService: UserService,
    private cdr: ChangeDetectorRef,
  ) {}

  // GET
  ngOnInit(): void {
    this.userService.getUsers().subscribe((data) => {
      console.log("DATA FROM API:", data);

      this.users = data;

      console.log("USERS LENGTH AFTER ASSIGN:", this.users.length);

      this.cdr.detectChanges();
    });
  }

  // CREATE
  addUser(name: string, email: string): void {
    const newUser: User = {
      name: name,
      email: email,
    };

    this.userService.createUser(newUser).subscribe((createdUser) => {
      this.users.push(createdUser);

      this.newName = "";
      this.newEmail = "";

      this.cdr.detectChanges();

      console.log("User created:", createdUser);
    });
  }

  // DELETE
  deleteUser(id: number): void {
    this.userService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter((user) => user.id !== id);

      this.cdr.detectChanges();

      console.log("User deleted:", id);
    });
  }

  // Start Edit
  editUser(user: User): void {
    this.editingUser = user;
    this.editName = user.name;
    this.editEmail = user.email;
  }

  // UPDATE
  saveEdit(): void {
    if (!this.editingUser) {
      return;
    }

    const updatedUser: User = {
      name: this.editName,
      email: this.editEmail,
    };

    this.userService
      .updateUser(this.editingUser.id!, updatedUser)
      .subscribe((result) => {
        const index = this.users.findIndex(
          (user) => user.id === this.editingUser!.id,
        );

        if (index !== -1) {
          this.users[index] = result;
        }

        this.editingUser = null;
        this.editName = "";
        this.editEmail = "";

        this.cdr.detectChanges();

        console.log("User updated:", result);
      });
  }

  // Cancel Edit
  cancelEdit(): void {
    this.editingUser = null;
    this.editName = "";
    this.editEmail = "";
  }
}
