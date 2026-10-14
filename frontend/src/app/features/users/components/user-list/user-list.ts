import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../models/user';

@Component({
  selector: 'app-user-list',
  imports: [RouterLink],
  templateUrl: './user-list.html',
  styleUrl: './user-list.css',
})
export class UserList {
  users = input<User[]>([]);
  editUser = output<User>();
  deleteUser = output<number>();
}
