import { Routes } from '@angular/router';

import { UsersPage } from './features/users/components/users-page/users-page';
import { UserDetails } from './features/users/components/user-details/user-details';
import { ShopPage } from './features/shop/components/shop-page/shop-page';
import { Login } from './features/auth/pages/login/login';
import { Register } from './features/auth/pages/register/register';
import { authGuard } from './features/auth/guards/auth.guard';
import { guestGuard } from './features/auth/guards/guest.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'users', pathMatch: 'full' },

  // logged-in users only
  { path: 'users', component: UsersPage, canActivate: [authGuard] },
  { path: 'users/:id', component: UserDetails, canActivate: [authGuard] },

  // everyone
  { path: 'shop', component: ShopPage },

  // logged-out users only
  { path: 'login', component: Login, canActivate: [guestGuard] },
  { path: 'register', component: Register, canActivate: [guestGuard] },

  { path: '**', redirectTo: 'users' },
];
