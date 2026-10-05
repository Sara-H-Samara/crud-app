import { Component } from '@angular/core';

import { UsersPage } from './features/users/components/users-page/users-page';

@Component({
  imports: [UsersPage],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {}
