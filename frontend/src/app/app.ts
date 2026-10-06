import { Component } from '@angular/core';
import { UsersPage } from './features/users/components/users-page/users-page';
import { ShopPage } from './features/shop/components/shop-page/shop-page';

@Component({
  selector: 'app-root',
  imports: [UsersPage, ShopPage],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  page: 'users' | 'shop' = 'users';

  setPage(page: 'users' | 'shop') {
    this.page = page;
  }
}
